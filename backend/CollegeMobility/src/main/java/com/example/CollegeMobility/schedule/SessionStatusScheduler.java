package com.example.CollegeMobility.schedule;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.CollegeMobility.entity.Sessions;
import com.example.CollegeMobility.repository.SessionRepository;

@Component
public class SessionStatusScheduler {

    private final SessionRepository sessionRepository;

    public SessionStatusScheduler(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Scheduled(fixedRate = 60000)
    public void updateSessionStatusToRunning() {

        System.out.println("🔁 Scheduler running");

        List<Sessions> scheduledSessions =
                sessionRepository.findByStatus("scheduled");

        LocalDateTime now = LocalDateTime.now().withSecond(0).withNano(0);

        for (Sessions session : scheduledSessions) {

            LocalDateTime sessionStart =
                    LocalDateTime.of(
                            session.getSessionDate(),
                            session.getStartTime()
                    ).withSecond(0).withNano(0);

            System.out.println("NOW: " + now + " | START: " + sessionStart);

            if (!now.isBefore(sessionStart)) {
                session.setStatus("running");
                sessionRepository.save(session);
                System.out.println("✅ Updated to RUNNING");
            }
        }
    }

    
    @Scheduled(fixedRate = 60000)
    public void updateSessionStatusToCompleted() {

        List<Sessions> runningSessions =
                sessionRepository.findByStatus("running");

        LocalDateTime now = LocalDateTime.now().withSecond(0).withNano(0);

        for (Sessions session : runningSessions) {

            LocalDateTime sessionEnd =
                    LocalDateTime.of(
                            session.getSessionDate(),
                            session.getStartTime()
                    ).plusMinutes(session.getDurationMinutes())
                     .withSecond(0).withNano(0);

            if (!now.isBefore(sessionEnd)) {
                session.setStatus("completed");
                sessionRepository.save(session);
                System.out.println("✅ Updated to COMPLETED");
            }
        }
    }


}