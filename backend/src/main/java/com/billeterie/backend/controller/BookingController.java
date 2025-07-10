package com.billeterie.backend.controller;

import com.billeterie.backend.model.Booking;
import com.billeterie.backend.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/reserve")
    public ResponseEntity<Booking> bookSeats(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Long eventId = Long.valueOf(payload.get("eventId").toString());
        List<Integer> seatIdsInt = (List<Integer>) payload.get("seatIds");
        List<Long> seatIds = seatIdsInt.stream().map(Integer::longValue).toList();
        Booking booking = bookingService.bookSeats(userId, eventId, seatIds);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long id) {
        return bookingService.getBooking(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
