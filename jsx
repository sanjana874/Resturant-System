import { useState } from "react";
import ReservationForm from "./components/ReservationForm";
import ReservationTable from "./components/ReservationTable";
import "./styles.css";

export default function App() {
    const totalSeats = 100;
    const [availableSeats, setAvailableSeats] = useState(totalSeats);
    const [reservations, setReservations] = useState([]);

    const addReservation = ({ name, phone, guests }) => {
        setAvailableSeats(availableSeats - guests);
        setReservations([...reservations, {
            id: Date.now(),
            name,
            phone,
            guests,
            checkIn: new Date().toLocaleTimeString(),
            checkOut: null
        }]);
    };

    const handleCheckout = (id) => {
        setReservations(reservations.map(res => 
            res.id === id ? { ...res, checkOut: new Date().toLocaleTimeString() } : res
        ));
    };

    const handleDelete = (id, guests, checkedOut) => {
        setReservations(reservations.filter(res => res.id !== id));
        if (!checkedOut) setAvailableSeats(availableSeats + guests);
    };

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <h2>Restaurant Reservation System</h2>
            <p>Seats Left: {availableSeats}</p>
            <ReservationForm addReservation={addReservation} availableSeats={availableSeats} />
            <ReservationTable reservations={reservations} handleCheckout={handleCheckout} handleDelete={handleDelete} />
        </div>
    );
}
