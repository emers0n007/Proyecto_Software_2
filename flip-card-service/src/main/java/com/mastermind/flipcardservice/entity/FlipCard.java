package com.mastermind.flipcardservice.entity;

import java.time.Duration;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Mastermind")
public class FlipCard {
    private Long idResult;
    private int score;
    private int timeUsed;
    private int attemps;

}
