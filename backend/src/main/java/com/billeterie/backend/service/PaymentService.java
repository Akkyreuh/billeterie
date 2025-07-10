package com.billeterie.backend.service;

import com.billeterie.backend.model.Booking;
import com.billeterie.backend.model.Payment;
import com.billeterie.backend.repository.BookingRepository;
import com.billeterie.backend.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    public PaymentService(PaymentRepository paymentRepository, BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    public Payment payBooking(Long bookingId, double amount) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        Payment payment = Payment.builder()
                .booking(booking)
                .amount(amount)
                .status("PAID")
                .paymentDate(LocalDateTime.now())
                .build();
        return paymentRepository.save(payment);
    }
}
