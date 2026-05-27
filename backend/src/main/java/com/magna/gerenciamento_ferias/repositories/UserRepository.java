package com.magna.gerenciamento_ferias.repositories;

import com.magna.gerenciamento_ferias.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);
}
