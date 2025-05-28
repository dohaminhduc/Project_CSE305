package Project305.MinhDuc.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Project305.MinhDuc.model.HealthData;
import Project305.MinhDuc.service.PatientService;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @GetMapping("/health")
    public ResponseEntity<List<HealthData>> getMyHealthData(Principal principal) {
        return ResponseEntity.ok(patientService.getHealthDataForLoggedInPatient(principal)); // Patient Service
    }

    @PostMapping("/request-doctor/{doctorId}")
    public ResponseEntity<String> requestConsult(@PathVariable Long doctorId, Principal principal) {
        patientService.requestConsultation(doctorId, principal);
        return ResponseEntity.ok("Request sent.");
    }

    @PostMapping("/pay")
    public ResponseEntity<String> payForConsultation(Principal principal) {
        patientService.handlePayment(principal); // Patient Service
        return ResponseEntity.ok("Payment Successful!");
    }

    @GetMapping("/age")
    public ResponseEntity<Integer> getAge(Principal principal) {
        return ResponseEntity.ok(patientService.getAge(principal)); // Patient Service
    }

}
