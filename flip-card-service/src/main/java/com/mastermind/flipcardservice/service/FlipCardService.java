package com.mastermind.flipcardservice.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

import com.mastermind.flipcardservice.dto.FlipCardDTO;
import com.mastermind.flipcardservice.entity.FlipCard;
import com.mastermind.flipcardservice.mapper.FlipCardMapper;
import com.mastermind.flipcardservice.repo.FlipCardRepo;

@Document(collection = "Mastermind")
@Service
public class FlipCardService {

    private static final Logger logger = LoggerFactory.getLogger(FlipCardService.class);

    @Autowired
    private FlipCardRepo flipCardRepo;

    public FlipCardDTO saveResultInDB(FlipCardDTO result) {
        logger.debug("Guardando resultado en la base de datos...");

        FlipCard flipCardSaved = new FlipCard(result.getIdResult(), result.getScore(), result.getTimeUsed(),
                result.getAttemps());

        flipCardRepo.save(flipCardSaved);

        logger.debug("Resultado guardado exitosamente en la base de datos.");

        return FlipCardMapper.INSTANCE.mapFlipCardToFlipCardDTO(flipCardSaved);
    }
}
