package com.emsbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emsbackend.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
