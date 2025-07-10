package com.billeterie.backend.service;

import com.billeterie.backend.model.*;
import com.billeterie.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final SeatRepository seatRepository;
    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, SeatRepository seatRepository, TicketRepository ticketRepository, EventRepository eventRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.seatRepository = seatRepository;
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Booking bookSeats(Long userId, Long eventId, List<Long> seatIds) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        List<Seat> seats = seatRepository.findAllById(seatIds);
        if (seats.size() != seatIds.size()) throw new RuntimeException("One or more seats not found");
        for (Seat seat : seats) {
            if (seat.getTicket() != null) throw new RuntimeException("Seat already booked: " + seat.getLabel());
        }
        Booking booking = Booking.builder()
                .user(user)
                .bookingDate(LocalDateTime.now())
                .status("PENDING")
                .build();
        booking = bookingRepository.save(booking);
        for (Seat seat : seats) {
            Ticket ticket = Ticket.builder().booking(booking).seat(seat).build();
            ticketRepository.save(ticket);
        }
        booking.setStatus("CONFIRMED");
        return bookingRepository.save(booking);
    }

    public Optional<Booking> getBooking(Long id) {
        return bookingRepository.findById(id);
    }
}
