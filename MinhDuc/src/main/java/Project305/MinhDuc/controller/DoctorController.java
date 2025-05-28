package Project305.MinhDuc.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Project305.MinhDuc.model.Patient;
import Project305.MinhDuc.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "*")
class DoctorController {
    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getRegisteredPatients(Principal principal) {
        return ResponseEntity.ok(doctorService.getRegisteredPatients(principal));
    }

    @GetMapping("/request-patient/{patientId}")
    public ResponseEntity<String> requestConsultation(@PathVariable Long patientId, Principal principal) {
        doctorService.requestConsultationWithPatient(patientId, principal);
        return ResponseEntity.ok("Consultation Request From Patient: " + patientId);
    }
}