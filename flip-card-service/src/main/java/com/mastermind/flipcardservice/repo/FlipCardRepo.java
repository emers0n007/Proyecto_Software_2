package com.mastermind.flipcardservice.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.mastermind.flipcardservice.entity.FlipCard;

@Repository
public interface FlipCardRepo extends MongoRepository<FlipCard, Long> {

}
