const tickets = [
    {
        id: 1,
        title: 'Fix Bug #234',
        status: 'In Progress',
        user: 'Alice',
        priority: 3,
    },
    {
        id: 2,
        title: 'Design Homepage',
        status: 'To Do',
        user: 'Bob',
        priority: 2,
    },
    {
        id: 3,
        title: 'Write Documentation',
        status: 'To Do',
        user: 'Alice',
        priority: 1,
    },
    {
        id: 4,
        title: 'Test Feature #567',
        status: 'Done',
        user: 'Charlie',
        priority: 4,
    },
    {
        id: 5,
        title: 'Deploy to Production',
        status: 'In Progress',
        user: 'Bob',
        priority: 0,
    },
];

const priorities = ['None', 'Low', 'Medium', 'High', 'Urgent'];

function groupTickets() {
    const groupBy = document.getElementById('groupBy').value;
    renderTickets(groupBy, document.getElementById('sortBy').value);
}

function sortTickets() {
    const sortBy = document.getElementById('sortBy').value;
    renderTickets(document.getElementById('groupBy').value, sortBy);
}

function renderTickets(groupBy, sortBy) {
    let groupedTickets = {};

    // Group the tickets
    tickets.forEach((ticket) => {
        let key;
        if (groupBy === 'status') {
            key = ticket.status;
        } else if (groupBy === 'user') {
            key = ticket.user;
        } else {
            key = priorities[ticket.priority];
        }
        if (!groupedTickets[key]) {
            groupedTickets[key] = [];
        }
        groupedTickets[key].push(ticket);
    });

    // Sort the tickets within each group
    for (const group in groupedTickets) {
        groupedTickets[group].sort((a, b) => {
            if (sortBy === 'priority') {
                return b.priority - a.priority;
            }
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
        });
    }

    // Render the tickets
    const kanbanBoard = document.getElementById('kanban-board');
    kanbanBoard.innerHTML = '';
    for (const group in groupedTickets) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('group');
        const groupTitle = document.createElement('h3');
        groupTitle.innerText = `${group} (${groupedTickets[group].length})`;
        groupDiv.appendChild(groupTitle);
        groupedTickets[group].forEach((ticket) => {
            const ticketCard = document.createElement('div');
            ticketCard.classList.add('ticket-card', `priority-${priorities[ticket.priority].toLowerCase()}`);
            ticketCard.innerHTML = `
                <h3>${ticket.title}</h3>
                <p><strong>Status:</strong> ${ticket.status}</p>
                <p><strong>User:</strong> ${ticket.user}</p>
                <p><strong>Priority:</strong> ${priorities[ticket.priority]}</p>
            `;
            groupDiv.appendChild(ticketCard);
        });
        kanbanBoard.appendChild(groupDiv);
    }
}

// Initial render
renderTickets('status', 'priority');
