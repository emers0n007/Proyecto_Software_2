package com.mastermind.flipcardservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FlipCardDTO {
    private Long idResult;
    private int score;
    private int timeUsed;
    private int attemps;
}
