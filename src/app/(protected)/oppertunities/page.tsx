'use client'
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOpportunity, getAllOpportunities } from "@/firebase/oppertunities.controller";
import Link from "next/link";
import { toast } from "sonner";

const Opportunities = () => {
  const userId = "imgInmRjc0noGAw5CFBa"; // TODO: Replace with userId from context once auth is implemented

  // TODO : Add the feature to filter oppertunities based on type, location, and salary

  const [opportunityData, setOpportunityData] = useState({
    title: "",
    Company: "",
    type: "",
    location: "",
    salary: "",
    applicationLink: "",
    vacancy: "",
  });

  const [opportunities, setOpportunities] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOpportunityData({ ...opportunityData, [name]: value });
  };

  const handleSaveOpportunity = async () => {
    const data = { ...opportunityData, postedBy: userId };
    const response = await createOpportunity(data);
    if (response.success) {
      toast.success("Opportunity created successfully!");
      fetchOpportunities(); // Refresh the list of opportunities
      setOpportunityData({ // Clear the form state
        title: "",
        Company: "",
        type: "",
        location: "",
        salary: "",
        applicationLink: "",
        vacancy: "",
      });
      setIsDialogOpen(false); // Close the dialog
    } else {
      toast.error(`Failed to create opportunity: ${response.message}`);
    }
  };

  const fetchOpportunities = async () => {
    const response = await getAllOpportunities();
    if (response.success) {
      setOpportunities(response.data);
    } else {
      toast.error(`Failed to fetch opportunities: ${response.message}`);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Opportunities</h2>

      {/* Section to add opportunities */}
      <div className="mb-8">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
              Add Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-800">Add Opportunity</DialogTitle>
              <DialogDescription className="text-gray-600">
                Fill the details of the opportunity you want to share.
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
                  value={opportunityData.title}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Company" className="text-right text-gray-700">
                  Company
                </Label>
                <Input
                  id="Company"
                  name="Company"
                  value={opportunityData.Company}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right text-gray-700">
                  Type
                </Label>
                <select
                  id="type"
                  name="type"
                  value={opportunityData.type}
                  onChange={handleChange}
                  className="col-span-3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Type</option>
                  <option value="Internship">Internship</option>
                  <option value="Job">Job</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right text-gray-700">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={opportunityData.location}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary" className="text-right text-gray-700">
                  Salary
                </Label>
                <Input
                  id="salary"
                  name="salary"
                  value={opportunityData.salary}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="applicationLink" className="text-right text-gray-700">
                  Application Link
                </Label>
                <Input
                  id="applicationLink"
                  name="applicationLink"
                  value={opportunityData.applicationLink}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vacancy" className="text-right text-gray-700">
                  Vacancy
                </Label>
                <Input
                  id="vacancy"
                  name="vacancy"
                  value={opportunityData.vacancy}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleSaveOpportunity}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Save Opportunity
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Section to view all the opportunities */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Opportunities</h3>
        {opportunities.length > 0 ? (
          <ul className="space-y-4">
            {opportunities.map((opportunity: any) => (
              <li
                key={opportunity.id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-gray-900">{opportunity.title}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <p><span className="font-semibold">Company:</span> {opportunity.Company}</p>
                    <p><span className="font-semibold">Type:</span> {opportunity.type}</p>
                    <p><span className="font-semibold">Location:</span> {opportunity.location}</p>
                    <p><span className="font-semibold">Salary:</span> {opportunity.salary}</p>
                    <p><span className="font-semibold">Vacancy:</span> {opportunity.vacancy}</p>
                  </div>
                  <Link
                    href={opportunity.applicationLink}
                    target="_blank"
                    className="inline-block text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Apply Here →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No opportunities available.</p>
        )}
      </div>
    </div>
  );
};

export default Opportunities;