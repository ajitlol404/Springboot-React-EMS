package com.emsbackend.service;

import com.emsbackend.dao.DepartmentRepository;
import com.emsbackend.dao.EmployeeRepository;
import com.emsbackend.dto.EmployeeDto;
import com.emsbackend.entity.Department;
import com.emsbackend.entity.Employee;
import com.emsbackend.exception.ResourceNotFoundException;
import com.emsbackend.mapper.EmployeeMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEntity(employeeDto);

        Department department = departmentRepository.findById(employeeDto.getDepartmentId()).orElseThrow(() -> new ResourceNotFoundException("Department not found with dId: " + employeeDto.getDepartmentId()));

        employee.setDepartment(department);

        return EmployeeMapper.mapToDto(employeeRepository.save(employee));
    }

    @Override
    public EmployeeDto getEmployeeById(Long eId) {
        return EmployeeMapper.mapToDto(employeeRepository.findById(eId).orElseThrow(() -> new ResourceNotFoundException("Employee not found with eId: " + eId)));
    }

    @Override
    public List<EmployeeDto> listAllEmployee() {
        List<Employee> listAllEmployee = employeeRepository.findAll();
        return listAllEmployee.stream().map(emp -> EmployeeMapper.mapToDto(emp)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long eId, EmployeeDto employeeDto) {
        Employee savedEmployee = employeeRepository.findById(eId).orElseThrow(() -> new ResourceNotFoundException("Employee not found with eId: " + eId));

        savedEmployee.setFirstName(employeeDto.getFirstName());
        savedEmployee.setLastName(employeeDto.getLastName());
        savedEmployee.setEmail(employeeDto.getEmail());

        Department department = departmentRepository.findById(employeeDto.getDepartmentId()).orElseThrow(() -> new ResourceNotFoundException("Department not found with dId: " + employeeDto.getDepartmentId()));

        savedEmployee.setDepartment(department);

        Employee updatedEmployee = employeeRepository.save(savedEmployee);

        return EmployeeMapper.mapToDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long eId) {
        Employee savedEmployee = employeeRepository.findById(eId).orElseThrow(() -> new ResourceNotFoundException("Employee not found with eId: " + eId));

        employeeRepository.delete(savedEmployee);
    }
}
