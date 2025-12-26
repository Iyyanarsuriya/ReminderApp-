const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback'
);

if (!process.env.GOOGLE_CLIENT_ID) {
    console.warn('⚠️ GOOGLE_CLIENT_ID is missing from .env. Google Calendar features will not work.');
}

const SCOPES = ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.readonly'];

exports.getAuthUrl = (state) => {
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
        state: state
    });
};

exports.getTokens = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
};

exports.createEvent = async (refreshToken, reminder) => {
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
        summary: reminder.title,
        description: reminder.description || 'Reminder from ReminderApp',
        start: {
            dateTime: new Date(reminder.due_date).toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
            dateTime: new Date(new Date(reminder.due_date).getTime() + 30 * 60000).toISOString(), // 30 mins later
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'popup', minutes: 10 },
                { method: 'email', minutes: 60 }
            ],
        },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating Google Calendar event:', error);
        throw error;
    }
};

exports.deleteEvent = async (refreshToken, eventId) => {
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    try {
        await calendar.events.delete({
            calendarId: 'primary',
            eventId: eventId,
        });
        return true;
    } catch (error) {
        console.error('Error deleting Google Calendar event:', error);
        return false;
    }
};
