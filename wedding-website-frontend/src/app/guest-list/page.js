"use client";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import { weddingApi } from "../utils/api";

export default function GuestListPage() {
  const [attendeeResponse, setAttendeeResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const data = await weddingApi.getRsvps();
        setAttendeeResponse(data);
      } catch (err) {
        setError(err.message || "Failed to fetch attendees");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendees();
  }, []);

  if (loading) return <div className="p-8">Loading guest list...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  const guests = attendeeResponse.data || [];

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-8">
        <h1 className="text-6xl font-bold mb-6 text-center">
          Wedding Guest List
        </h1>

        {guests.length === 0 ? (
          <p>No guests found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guests.map((attendee) => (
              <div
                key={attendee.id}
                className="bg-white p-6 rounded-lg shadow-md border"
              >
                <h2 className="text-xl font-semibold mb-2">{attendee.name}</h2>
                <div className="space-y-1 text-gray-600">
                  <p>
                    <strong>Email:</strong> {attendee.email || "—"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {attendee.phone || "—"}
                  </p>
                  <p>
                    <strong>RSVP Status:</strong>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-sm ${
                        attendee.rsvp_status === "attending"
                          ? "bg-green-100 text-green-800"
                          : attendee.rsvp_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {attendee.rsvp_status}
                    </span>
                  </p>
                  {attendee.dietary_restrictions && (
                    <p>
                      <strong>Dietary Restrictions:</strong>{" "}
                      {attendee.dietary_restrictions}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
