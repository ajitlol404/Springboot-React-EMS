package com.emsbackend.service;

import com.emsbackend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long eId);

    List<EmployeeDto> listAllEmployee();

    EmployeeDto updateEmployee(Long eId, EmployeeDto employeeDto);

    void deleteEmployee(Long eId);

}
