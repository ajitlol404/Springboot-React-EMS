package com.emsbackend.controller;

import com.emsbackend.entity.Department;
import com.emsbackend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/department")
@AllArgsConstructor
public class DepartmentController {

    private DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department dto) {
        System.out.println(dto);
        Department savedDepartment = departmentService.createDepartment(dto);
        return new ResponseEntity<>(savedDepartment, HttpStatus.CREATED);
    }

    @GetMapping("/{dId}")
    public Department getDepartmentById(@PathVariable Long dId) {
        return departmentService.getDepartmentById(dId);
    }

    @GetMapping
    public List<Department> listAllDepartment() {
        return departmentService.listAllDepartment();
    }

    @PutMapping("/{dId}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long dId, @RequestBody Department dto) {
        return ResponseEntity.ok(departmentService.updateDepartment(dId, dto));
    }

    @DeleteMapping("/{dId}")
    public ResponseEntity<Department> deleteDepartment(@PathVariable Long dId) {
        departmentService.deleteDepartment(dId);
        return ResponseEntity.noContent().build();
    }
}
