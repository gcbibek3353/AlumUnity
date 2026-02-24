'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createEvent, getAllEvents } from '@/firebase/event.controller';
import { toast } from 'sonner';
import { useFirebase } from '@/firebase/firebase.config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Events = () => {
  const { loggedInUser } = useFirebase();
  const userId = loggedInUser?.uid || '';

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    meet_link: '',
    location: '',
  });

  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSaveEvent = async () => {
    const data = { ...eventData, author: userId };
    const response = await createEvent(data);
    if (response.success) {
      toast.success('Event created successfully!');
      fetchEvents(); // Refresh the list of events
      setEventData({ // Clear the form state
        title: '',
        description: '',
        date: '',
        meet_link: '',
        location: '',
      });
      setIsDialogOpen(false); // Close the dialog
    } else {
      toast.error(`Failed to create event: ${response.message}`);
    }
  };
  function ConfirmJoinLink({ meetLink }: { meetLink: string }) {
    const router = useRouter();

    const handleConfirm = () => {
      window.location.href = meetLink
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <span className="text-indigo-600 hover:text-indigo-800 cursor-pointer underline">
            Join Here
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Meeting</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to join this meeting?</p>
          <DialogFooter>
            <Button variant="secondary">Cancel</Button>
            <Button onClick={handleConfirm}>Yes, Join</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const fetchEvents = async () => {
    const response = await getAllEvents();
    if (response.success) {
      setEvents(response.data);
    } else {
      toast.error(`Failed to fetch events: ${response.message}`);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Events</h2>

      {/* Section to add events */}
      <div className="mb-8">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-800">Add Event</DialogTitle>
              <DialogDescription className="text-gray-600">
                Fill the details of the event you want to create.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right text-gray-700">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right text-gray-700">
                  Description
                </Label>
                <textarea
                  id="description"
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md px-3 py-2"
                  rows={4}
                ></textarea>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right text-gray-700">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  value={eventData.date}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meet_link" className="text-right text-gray-700">
                  Meet Link
                </Label>
                <Input
                  id="meet_link"
                  name="meet_link"
                  value={eventData.meet_link}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right text-gray-700">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={eventData.location}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleSaveEvent}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Save Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Section to view all events */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">All Events</h3>
        {events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event: any) => (
              <li
                key={event.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col gap-4">

                  {/* Top Section */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {event.title}
                      </h4>
                      <p className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full inline-block mt-2">
  {new Date(event.date).toLocaleString()}
</p>
                    </div>

                    {event.meet_link && (
                      <div className="flex-shrink-0">
                        <ConfirmJoinLink meetLink={event.meet_link} />
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100" />

                  {/* Description */}
                  {event.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  )}

                  {/* Location */}
                  {event.location && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-gray-700">Location:</span>{" "}
                      {event.location}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Events;