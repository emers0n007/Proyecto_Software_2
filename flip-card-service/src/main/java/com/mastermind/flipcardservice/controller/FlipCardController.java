package com.mastermind.flipcardservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mastermind.flipcardservice.dto.FlipCardDTO;
import com.mastermind.flipcardservice.service.FlipCardService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/flipcard")
public class FlipCardController {

    @Autowired
    private FlipCardService flipCardService;

    @PostMapping("/saveresult")
    public ResponseEntity<FlipCardDTO> saveResult(@RequestBody FlipCardDTO flipCardDTO) {
        FlipCardDTO flipCardSaveInDB = flipCardService.saveResultInDB(flipCardDTO);
        return new ResponseEntity<>(flipCardSaveInDB, HttpStatus.CREATED);

    }

}
