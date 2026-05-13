package com.jonathas.gerenciamento_ferias.controller;

import com.jonathas.gerenciamento_ferias.service.HelloWorldService;
import com.jonathas.gerenciamento_ferias.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hello-world")


public class HelloWorldController {

    @Autowired

    private HelloWorldService helloWorldService;

    /*
    public HelloWorldController(HelloWorldService helloWorldService){
        this.helloWorldService = helloWorldService;
    }

    OU o Autowired

    */

    @GetMapping
    public String HelloWorld(){
        return helloWorldService.helloWorld("Jonathas");
    }

    @PostMapping("/{id}")
    public String helloWorldPost(@PathVariable("id") int id,@RequestParam(value = "filter", defaultValue = "nenhum") String filter, @RequestBody User body){
        return ("Hello World, " + body.getName() + ". Idade: " + body.getIdade()  + " Filtro: " + filter);
    }
}
