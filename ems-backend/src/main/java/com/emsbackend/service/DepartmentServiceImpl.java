package com.emsbackend.service;

import com.emsbackend.dao.DepartmentRepository;
import com.emsbackend.entity.Department;
import com.emsbackend.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    @Override
    public Department getDepartmentById(Long dId) {
        return departmentRepository.findById(dId).orElseThrow(() -> new ResourceNotFoundException("Department not found with dId: " + dId));
    }

    @Override
    public List<Department> listAllDepartment() {
        return departmentRepository.findAll();
    }

    @Override
    public Department updateDepartment(Long dId, Department department) {
        Department savedDepartment = departmentRepository.findById(dId).orElseThrow(() -> new ResourceNotFoundException("Department not found with dId: " + dId));

        savedDepartment.setDepartmentName(department.getDepartmentName());
        savedDepartment.setDepartmentDescription(department.getDepartmentDescription());

        Department updatedDepartment = departmentRepository.save(savedDepartment);

        return updatedDepartment;
    }

    @Override
    public void deleteDepartment(Long dId) {
        Department savedDepartment = departmentRepository.findById(dId).orElseThrow(() -> new ResourceNotFoundException("Department not found with dId: " + dId));

        departmentRepository.delete(savedDepartment);
    }
}
