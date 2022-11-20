# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1

SUBJECT: Create relationship table for custom IDs

DESCRIPTION:

Create database table `facility_agents` to store information regarding each agent within a facility. The table represents a many-to-many relationship between facilities and agents. There should be two foreign key references to the `facilities` and `agents` tables.

Another field `custom_id` is needed to store the custom id. It should be of string type with an appropriate size.

ESTIMATE: 0.5 d

### Ticket 2

SUBJECT: Create API endpoints for custom IDs

DEPENDENCY: Ticket 1

DESCRIPTION:

Implement API endpoints for these functionalities:

- For a given facility, query all agents that have at least one shift. The response should include internal agent ID, agent name (plus any relevant information), and custom ID if available. The response should be paginated.
- For a given facility and agent, set the custom ID.
- For a given facility and agent, remove the custom ID.
- For a given facility, set/remove multiple custom ID entries.

Implement unit tests for these API endpoints.

ESTIMATE: 1 d

### Ticket 3

SUBJECT: Create UI interface for facilities to set custom IDs for agents.

DEPENDENCY: Ticket 2

DESCRIPTION:

User profile: facility user.

Before generating a report, the user should be prompted to edit custom IDs for the agents. Optionally, the user may have an entry under settings to edit custom IDs.

The interface should utilize the endpoints described in ticket 2 to display agents and their custom IDs, and allow the user to make edits.

ESTIMATE: 1 d

### Ticket 4

SUBJECT: Modify PDF generation to use custom IDs

DEPENDENCY: Ticket 1

DESCRIPTION:

During PDF generation, custom IDs for agents should be used if available. If not, fallback to internal IDs.

ESTIMATE: < 0.5 d
