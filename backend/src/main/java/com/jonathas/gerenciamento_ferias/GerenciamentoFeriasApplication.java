package com.jonathas.gerenciamento_ferias;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
@EnableAutoConfiguration
@ComponentScan
public class GerenciamentoFeriasApplication {

	public static void main(String[] args) {
		SpringApplication.run(GerenciamentoFeriasApplication.class, args);
	}

}
