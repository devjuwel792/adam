"use client"

export function AdditionalOptionsSection({ formData, onInputChange }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#C9A14A] text-white rounded-full flex items-center justify-center font-semibold">
          4
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Additional Options</h2>
      </div>

      <div className="space-y-6">
        {/* Special Requests */}
        <div>
          <label htmlFor="specialRequests" className="text-sm font-medium text-gray-700 mb-2 block">
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            placeholder="Any special accommodations or requests"
            value={formData.specialRequests}
            onChange={(e) => onInputChange("specialRequests", e.target.value)}
            className="w-full h-24 resize-none border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="email-notifications"
              checked={formData.emailNotifications}
              onChange={(e) => onInputChange("emailNotifications", e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="email-notifications" className="text-sm text-gray-700">
              Email results notification
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sms-reminders"
              checked={formData.smsReminders}
              onChange={(e) => onInputChange("smsReminders", e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="sms-reminders" className="text-sm text-gray-700">
              SMS appointment reminders
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
