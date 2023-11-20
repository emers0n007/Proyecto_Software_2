package com.mastermind.flipcardservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.mastermind.flipcardservice.dto.FlipCardDTO;
import com.mastermind.flipcardservice.entity.FlipCard;

@Mapper
public interface FlipCardMapper {
    FlipCardMapper INSTANCE = Mappers.getMapper(FlipCardMapper.class);

    FlipCard mapFlipCardDTOToFlipCard(FlipCardDTO flipCardDTO);

    FlipCardDTO mapFlipCardToFlipCardDTO(FlipCard flipCard);
}
