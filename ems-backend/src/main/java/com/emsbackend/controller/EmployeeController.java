package com.emsbackend.controller;

import com.emsbackend.dto.EmployeeDto;
import com.emsbackend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employee")
@AllArgsConstructor
public class EmployeeController {

    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto dto) {
        System.out.println(dto);
        EmployeeDto savedEmployee = employeeService.createEmployee(dto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @GetMapping("/{eId}")
    public EmployeeDto getEmployeeById(@PathVariable Long eId) {
        return employeeService.getEmployeeById(eId);
    }

    @GetMapping
    public List<EmployeeDto> listAllEmployee() {
        return employeeService.listAllEmployee();
    }

    @PutMapping("/{eId}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Long eId, @RequestBody EmployeeDto dto) {
        return ResponseEntity.ok(employeeService.updateEmployee(eId, dto));
    }

    @DeleteMapping("/{eId}")
    public ResponseEntity<EmployeeDto> deleteEmployee(@PathVariable Long eId) {
        employeeService.deleteEmployee(eId);
        return ResponseEntity.noContent().build();
    }
}
