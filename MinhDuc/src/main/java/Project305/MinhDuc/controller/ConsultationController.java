package Project305.MinhDuc.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Project305.MinhDuc.model.ConsultationRequest;
import Project305.MinhDuc.service.ConsultationService;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins ="*")
public class ConsultationController {
    @Autowired
    private ConsultationService consultationService;


    //Create function get the status of request in class ConsultationService

    @GetMapping("/pending")
    public ResponseEntity<List<ConsultationRequest>> getPendingRequests(Principal principal) {
        return ResponseEntity.ok(consultationService.getPendingRequests(principal));
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<String> acceptRequest(@PathVariable Long id, Principal principal) {
        boolean result = consultationService.acceptRequest(id, principal);
        if (result) return ResponseEntity.ok("Request accepted.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or unauthorized request");
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<String> rejectRequest(@PathVariable Long id, Principal principal) {
        boolean result = consultationService.rejectRequest(id, principal);
        if (result) return ResponseEntity.ok("Request rejected.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or unauthorized request");
    }
}