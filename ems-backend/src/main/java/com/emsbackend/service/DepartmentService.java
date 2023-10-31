package com.emsbackend.service;

import com.emsbackend.entity.Department;

import java.util.List;

public interface DepartmentService {

    Department createDepartment(Department department);

    Department getDepartmentById(Long dId);

    List<Department> listAllDepartment();

    Department updateDepartment(Long dId, Department department);

    void deleteDepartment(Long dId);

}
