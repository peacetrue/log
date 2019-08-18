package com.github.peacetrue.log.mybatis;

import com.github.pagehelper.PageHelper;
import com.github.peacetrue.id.IdGenerator;
import com.github.peacetrue.log.service.LogAddDTO;
import com.github.peacetrue.log.service.LogQueryDTO;
import com.github.peacetrue.log.service.LogService;
import com.github.peacetrue.log.service.LogVO;
import com.github.peacetrue.mybatis.dynamic.MybatisDynamicUtils;
import com.github.peacetrue.mybatis.dynamic.sql.GroupConcat;
import com.github.peacetrue.mybatis.dynamic.sql.select.LimitAndOffsetAdapter;
import com.github.peacetrue.pagehelper.PageHelperUtils;
import com.github.peacetrue.serialize.SerializeService;
import com.github.peacetrue.spring.util.BeanUtils;
import org.mybatis.dynamic.sql.SqlBuilder;
import org.mybatis.dynamic.sql.SqlColumn;
import org.mybatis.dynamic.sql.render.RenderingStrategy;
import org.mybatis.dynamic.sql.select.SelectDSL;
import org.mybatis.dynamic.sql.select.render.SelectStatementProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Nullable;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.github.peacetrue.log.mybatis.LogDynamicSqlSupport.*;

/**
 * @author xiayx
 */
@SuppressWarnings("unchecked")
public class LogServiceImpl implements LogService {

    /** {@link LogAddDTO#getInput()} 的序列化服务名 */
    public static final String INPUT_SERIALIZE_SERVICE = "inputSerializeService";

    /** {@link LogAddDTO#getOutput()} 的序列化服务名 */
    public static final String OUTPUT_SERIALIZE_SERVICE = "outputSerializeService";

    /** {@link LogAddDTO#getException()} 的序列化服务名 */
    public static final String EXCEPTION_SERIALIZE_SERVICE = "exceptionSerializeService";

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private LogMapper logMapper;
    @Autowired(required = false)
    private IdGenerator idGenerator;
    @Autowired
    @Qualifier(INPUT_SERIALIZE_SERVICE)
    private SerializeService inputSerializeService;
    @Autowired
    @Qualifier(OUTPUT_SERIALIZE_SERVICE)
    private SerializeService outputSerializeService;
    @Autowired
    @Qualifier(EXCEPTION_SERIALIZE_SERVICE)
    private SerializeService exceptionSerializeService;

    @Transactional
    public LogVO add(LogAddDTO dto) {
        logger.info("新增日志[{}]", dto);
        Log log = BeanUtils.map(dto, Log.class);
        if (idGenerator != null) log.setId(idGenerator.generateId());
        log.setInput(inputSerializeService.serialize(dto.getInput()));
        log.setOutput(outputSerializeService.serialize(dto.getOutput()));
        log.setException(exceptionSerializeService.serialize(dto.getException()));
        log.setCreatedTime(new Date());
        log.setCreatorId(dto.getOperatorId());
        logger.debug("保存日志[{}]", log);
        int count = logMapper.insert(log);
        logger.debug("共影响[{}]行记录", count);
        return BeanUtils.map(log, LogVO.class);
    }

    @Override
    public Page<LogVO> query(@Nullable LogQueryDTO dto, Pageable pageable) {
        logger.info("分页查询日志信息[{}]", dto);

        if (dto == null) dto = LogQueryDTO.DEFAULT;

        PageHelper.startPage(pageable.getPageNumber() + 1, pageable.getPageSize());
        List<Log> entities = logMapper.selectByExample()
                .where(moduleCode, SqlBuilder.isEqualToWhenPresent(dto.getModuleCode()))
                .and((SqlColumn<Object>) recordId, SqlBuilder.isEqualToWhenPresent(dto.getRecordId()))
                .and(operateCode, SqlBuilder.isEqualToWhenPresent(dto.getOperateCode()))
                .and(description, SqlBuilder.isLikeWhenPresent(MybatisDynamicUtils.likeValue(dto.getDescription())))
                .and((SqlColumn<Object>) creatorId, SqlBuilder.isEqualToWhenPresent(dto.getCreatorId()))
                .and(createdTime, SqlBuilder.isBetweenWhenPresent(dto.getCreatedTime().getLowerBound()).and(dto.getCreatedTime().getUpperBound()))
                .orderBy(MybatisDynamicUtils.orders(log, pageable.getSort()))
                .build().execute();
        logger.debug("共取得'{}'条记录", entities.size());
        if (entities.isEmpty()) return new PageImpl<>(Collections.emptyList());

        List<LogVO> vos = BeanUtils.replaceAsList(entities, LogVO.class);
        vos.forEach(vo -> {
            vo.setInput(inputSerializeService.deserialize(vo.getInput()));
            vo.setOutput(outputSerializeService.deserialize(vo.getOutput()));
            vo.setException(outputSerializeService.deserialize(vo.getException()));
        });
        return new PageImpl<>(vos, pageable, PageHelperUtils.getTotal(entities));
    }

    @Override
    public LogVO getLatest(String moduleCode, Object recordId) {
        logger.info("获取[{}-{}]最近的操作记录", moduleCode, recordId);
        return SelectDSL.select(
                selectModel -> LimitAndOffsetAdapter.firstOne(selectModel, logMapper::selectMany),
                SqlColumn.of("*", log))
                .from(log)
                .where(log.moduleCode, SqlBuilder.isEqualTo(moduleCode))
                .and((SqlColumn<Object>) log.recordId, SqlBuilder.isEqualTo(recordId))
                .orderBy(log.createdTime.descending())
                .build().execute().stream()
                .map(log -> BeanUtils.map(log, LogVO.class)).reduce(null, (l, r) -> r);
    }

    @Override
    public List<LogVO> getLatest(String moduleCode, List<?> recordIds) {
        logger.info("获取[{}-{}]最近的操作记录", moduleCode, recordIds);
        GroupConcat groupConcat = GroupConcat.of(log.id);
        SelectStatementProvider provider = SqlBuilder.select(groupConcat.withSort(log.createdTime.descending()))
                .from(log)
                .where(log.moduleCode, SqlBuilder.isEqualTo(moduleCode))
                .and((SqlColumn<Object>) log.recordId, SqlBuilder.isIn((List<Object>) recordIds))
                .groupBy(log.moduleCode, log.recordId)
                .build().render(RenderingStrategy.MYBATIS3);
        List<String> ids = logMapper.selectListObject(provider);
        logger.debug("取得所有日志主键[{}]", ids);
        if (ids.isEmpty()) return Collections.emptyList();

        List<Object> groupedIds = ids.stream().map(groupConcat::getFirstValue).collect(Collectors.toList());
        logger.debug("取得分组后的日志主键[{}]", ids);

        provider = SqlBuilder.select(SqlColumn.of("*", log))
                .from(log).where((SqlColumn<Object>) log.id, SqlBuilder.isIn(groupedIds))
                .build().render(RenderingStrategy.MYBATIS3);
        return logMapper.selectMany(provider).stream().map(log -> BeanUtils.map(log, LogVO.class)).collect(Collectors.toList());
    }

}
