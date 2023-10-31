package com.emsbackend.mapper;

import com.emsbackend.dto.EmployeeDto;
import com.emsbackend.entity.Employee;

public class EmployeeMapper {

    private EmployeeMapper() {
        throw new IllegalStateException("EmployeeMapper Utility class");
    }

    public static EmployeeDto mapToDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail(), employee.getDepartment().getId());
    }

    public static Employee mapToEntity(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employee.getLastName());
        employee.setEmail(employeeDto.getEmail());

        return employee;
    }
}
