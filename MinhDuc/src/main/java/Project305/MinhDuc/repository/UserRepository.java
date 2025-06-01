package Project305.MinhDuc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Project305.MinhDuc.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
