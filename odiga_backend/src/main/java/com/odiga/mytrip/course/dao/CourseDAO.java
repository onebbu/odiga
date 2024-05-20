    package com.odiga.mytrip.course.dao;

    import java.util.List;

    import org.apache.ibatis.annotations.Mapper;

    import com.odiga.mytrip.course.vo.CourseVO;

    @Mapper
    public interface CourseDAO {
        List<CourseVO> getResultList(String nickname);
        void saveCourseData(String boardTitle , String boardContent , String mainimage ,String tags , String email , String nickname , String courseno);   
    }
