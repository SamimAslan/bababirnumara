import React from "react";
import { X } from "lucide-react";
import type { NomadFormState } from "../types";
import { CityAutocomplete } from "./CityAutoComplete";

interface NomadModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: NomadFormState;
  setForm: (form: NomadFormState) => void;
  fromCity: string;
}

export const NomadModal: React.FC<NomadModalProps> = ({
  isOpen,
  onClose,
  form,
  setForm,
  fromCity,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200 relative">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-[#111827]">
              Places to visit
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600 mb-8">
            Add at least two destinations and Nomad will shuffle them to find
            the best travel options.
          </p>

          <div className="space-y-6">
            <div className="w-full p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 focus-within:bg-white focus-within:border-[#2F34A2] focus-within:ring-0 transition-colors">
              <CityAutocomplete
                value={form.dest1}
                onChange={(v) => setForm({ ...form, dest1: v })}
                placeholder="First destination"
                wrapperClassName="w-full relative"
                inputClassName="w-full bg-transparent outline-none font-medium placeholder-gray-400"
              />
            </div>

            <div className="w-full p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 focus-within:bg-white focus-within:border-[#2F34A2] focus-within:ring-0 transition-colors">
              <CityAutocomplete
                value={form.dest2}
                onChange={(v) => setForm({ ...form, dest2: v })}
                placeholder="Second destination"
                wrapperClassName="w-full relative"
                inputClassName="w-full bg-transparent outline-none font-medium placeholder-gray-400"
              />
            </div>

            <div className="pt-2">
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="returnDifferent"
                    type="checkbox"
                    className="h-5 w-5 text-[#2F34A2] border-gray-300 rounded focus:ring-[#2F34A2]"
                    checked={form.isReturnDifferent}
                    onChange={(e) =>
                      setForm({ ...form, isReturnDifferent: e.target.checked })
                    }
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="returnDifferent"
                    className="font-semibold text-[#111827] block"
                  >
                    Return to a different location
                  </label>
                  <span className="text-sm text-gray-500 block">
                    I don't want to return to the starting location
                  </span>
                </div>
              </div>

              {form.isReturnDifferent && (
                <div className="mt-4">
                  <div className="flex items-center bg-white border border-gray-300 rounded-lg p-3 hover:border-gray-400 transition-colors">
                    <span className="text-gray-500 mr-2 whitespace-nowrap">
                      End trip at
                    </span>
                    <CityAutocomplete
                      value={form.endCity}
                      onChange={(v) => setForm({ ...form, endCity: v })}
                      placeholder="City or airport"
                      wrapperClassName="flex-1 relative"
                      inputClassName="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-10">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
              }}
              className="px-6 py-3 bg-[#a2dfd6] text-[#006c5b] font-bold rounded-lg hover:bg-[#8fdad0] transition-colors"
            >
              Search journeys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
