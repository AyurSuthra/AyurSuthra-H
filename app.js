// Hospital Administration Portal JavaScript - Fixed Version
// Application data from the provided JSON
const hospitalData = {
    hospitalStats: {
        totalPatients: 147,
        activeTherapists: 12,
        todayAppointments: 23,
        completedSessions: 156,
        pendingAssignments: 4,
        roomUtilization: 78,
        avgTreatmentDuration: 18,
        patientSatisfaction: 94
    },
    patients: [
        {
            id: "PT001",
            name: "Raghav Sharma",
            age: 42,
            phone: "+91 98765 43210",
            prakriti: "Vata-Pitta",
            assignedTherapist: "Dr. Meera Sharma",
            status: "Active",
            progress: 75,
            nextSession: "2025-09-16T10:00:00",
            registrationDate: "2025-09-02",
            therapy: "Abhyanga + Swedana"
        },
        {
            id: "PT002",
            name: "Priya Devi",
            age: 35,
            phone: "+91 98123 45678",
            prakriti: "Kapha-Vata",
            assignedTherapist: "Dr. Amit Kumar",
            status: "Active",
            progress: 40,
            nextSession: "2025-09-15T14:00:00",
            registrationDate: "2025-09-08",
            therapy: "Panchakarma Full Course"
        },
        {
            id: "PT003",
            name: "Arjun Singh",
            age: 28,
            phone: "+91 97654 32109",
            prakriti: "Pitta",
            assignedTherapist: "Dr. Kavya Nair",
            status: "Completing",
            progress: 90,
            nextSession: "2025-09-20T09:00:00",
            registrationDate: "2025-08-28",
            therapy: "Virechana"
        },
        {
            id: "PT004",
            name: "Sunita Gupta",
            age: 50,
            phone: "+91 96543 21098",
            prakriti: "Vata",
            assignedTherapist: "Dr. Rajesh Patel",
            status: "Active",
            progress: 60,
            nextSession: "2025-09-17T11:00:00",
            registrationDate: "2025-09-05",
            therapy: "Basti"
        }
    ],
    therapists: [
        {
            id: "TH001",
            name: "Dr. Meera Sharma",
            specialization: "Panchakarma Specialist",
            experience: "8 years",
            currentPatients: 8,
            maxCapacity: 12,
            availability: "Available",
            rating: 4.8,
            phone: "+91 90123 45678"
        },
        {
            id: "TH002",
            name: "Dr. Amit Kumar",
            specialization: "Detox Therapies",
            experience: "6 years",
            currentPatients: 10,
            maxCapacity: 15,
            availability: "Busy",
            rating: 4.6,
            phone: "+91 89012 34567"
        },
        {
            id: "TH003",
            name: "Dr. Kavya Nair",
            specialization: "Abhyanga & Swedana",
            experience: "5 years",
            currentPatients: 7,
            maxCapacity: 10,
            availability: "Available",
            rating: 4.9,
            phone: "+91 78901 23456"
        },
        {
            id: "TH004",
            name: "Dr. Rajesh Patel",
            specialization: "Basti Therapy",
            experience: "12 years",
            currentPatients: 6,
            maxCapacity: 8,
            availability: "Available",
            rating: 4.7,
            phone: "+91 67890 12345"
        }
    ],
    recentActivities: [
        {
            type: "patient_registered",
            message: "New patient Arjun Patel registered",
            time: "2 hours ago",
            status: "success"
        },
        {
            type: "assignment_made",
            message: "Patient PT002 assigned to Dr. Amit Kumar",
            time: "3 hours ago",
            status: "success"
        },
        {
            type: "session_completed",
            message: "Abhyanga session completed for PT001",
            time: "4 hours ago",
            status: "success"
        },
        {
            type: "sync_update",
            message: "Patient portal synchronized successfully",
            time: "5 minutes ago",
            status: "info"
        }
    ],
    upcomingAppointments: [
        {
            patientName: "Priya Devi",
            therapist: "Dr. Amit Kumar",
            time: "14:00",
            therapy: "Panchakarma Session",
            room: "Room 3"
        },
        {
            patientName: "Raghav Sharma",
            therapist: "Dr. Meera Sharma",
            time: "16:00",
            therapy: "Abhyanga",
            room: "Room 1"
        },
        {
            patientName: "Sunita Gupta",
            therapist: "Dr. Rajesh Patel",
            time: "17:00",
            therapy: "Basti Preparation",
            room: "Room 2"
        }
    ]
};

// Global state management
let currentView = 'dashboard';
let currentWeek = new Date('2025-09-15');
let draggedPatient = null;
let selectedPatientForAssignment = null;
let outcomesChart = null;
let satisfactionChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('AyurSutra Hospital Administration Portal initializing...');
    
    // Wait for DOM to be fully ready
    setTimeout(() => {
        initializeApp();
        setupEventListeners();
        updateDashboard();
        startSyncStatusUpdates();
        console.log('Hospital administration portal initialized successfully');
    }, 100);
});

function initializeApp() {
    // Show dashboard by default
    showView('dashboard');
    
    // Initialize all components
    updateHeaderStats();
    populatePatientTable();
    populateTherapistGrid();
    setupAssignmentCenter();
    generateWeeklyCalendar();
    populateCommunicationCenter();
    setupIntegrationMonitoring();
    
    // Fix form inputs
    fixFormInputs();
}

function fixFormInputs() {
    // Ensure all form inputs are properly enabled and responsive
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.removeAttribute('disabled');
        
        // Add event listeners to ensure inputs work
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-admin-primary)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
        });
        
        if (input.tagName === 'INPUT' && (input.type === 'text' || input.type === 'email' || input.type === 'tel' || input.type === 'number')) {
            input.addEventListener('input', function() {
                console.log('Input changed:', this.value);
            });
        }
    });
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Navigation event listeners - Fixed to be more reliable
    document.addEventListener('click', function(e) {
        const navItem = e.target.closest('.nav-item[data-view]');
        if (navItem) {
            e.preventDefault();
            e.stopPropagation();
            const viewName = navItem.getAttribute('data-view');
            console.log('Navigation clicked:', viewName);
            showView(viewName);
            return;
        }
        
        // Action button handling
        const actionButton = e.target.closest('[data-action]');
        if (actionButton) {
            e.preventDefault();
            e.stopPropagation();
            const action = actionButton.getAttribute('data-action');
            console.log('Action clicked:', action);
            handleAction(action, actionButton);
            return;
        }
        
        // Modal close handling
        if (e.target.classList.contains('modal')) {
            closeModal();
            return;
        }
    });
    
    // Search and filter functionality
    const searchInput = document.getElementById('patient-search');
    if (searchInput) {
        searchInput.addEventListener('input', handlePatientSearch);
    }
    
    const statusFilter = document.getElementById('status-filter');
    const therapyFilter = document.getElementById('therapy-filter');
    if (statusFilter) statusFilter.addEventListener('change', handlePatientFilter);
    if (therapyFilter) therapyFilter.addEventListener('change', handlePatientFilter);
    
    // Form submissions
    const registrationForm = document.getElementById('patient-registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handlePatientRegistration);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    console.log('Event listeners setup complete');
}

// Navigation functions - Fixed to be more reliable
function showView(viewName) {
    console.log('Showing view:', viewName);
    
    try {
        // Update navigation active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-view="${viewName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
        
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
            view.style.display = 'none';
        });
        
        // Show target view
        const activeView = document.getElementById(`${viewName}-view`);
        if (activeView) {
            activeView.classList.add('active');
            activeView.style.display = 'block';
            currentView = viewName;
            
            // Trigger view-specific updates
            setTimeout(() => {
                switch(viewName) {
                    case 'dashboard':
                        updateDashboard();
                        break;
                    case 'patient-registration':
                        // Focus first input
                        const firstInput = activeView.querySelector('input');
                        if (firstInput) firstInput.focus();
                        break;
                    case 'patient-management':
                        populatePatientTable();
                        break;
                    case 'therapist-management':
                        populateTherapistGrid();
                        break;
                    case 'assignment-center':
                        setupAssignmentCenter();
                        break;
                    case 'scheduling-hub':
                        generateWeeklyCalendar();
                        break;
                    case 'communication':
                        populateCommunicationCenter();
                        break;
                    case 'analytics':
                        initializeCharts();
                        break;
                    case 'integration':
                        updateIntegrationStatus();
                        break;
                }
            }, 100);
            
            // Scroll to top
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.scrollTop = 0;
            }
            
            showToast(`Navigated to ${formatViewName(viewName)}`, 'success');
            console.log('Successfully navigated to:', viewName);
        } else {
            console.error('View not found:', `${viewName}-view`);
            showToast('View not found', 'error');
        }
    } catch (error) {
        console.error('Error showing view:', error);
        showToast('Navigation error occurred', 'error');
    }
}

function formatViewName(viewName) {
    return viewName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Action handler - Enhanced with better error handling
function handleAction(action, button) {
    console.log('Handling action:', action);
    
    try {
        switch(action) {
            case 'toggle-notifications':
                toggleNotificationsPanel();
                break;
            case 'add-patient':
                showView('patient-registration');
                break;
            case 'emergency-assignment':
                handleEmergencyAssignment();
                break;
            case 'emergency-alert':
                handleEmergencyAlert();
                break;
            case 'assign-therapist':
                const patientId = button.getAttribute('data-patient');
                openAssignmentModal(patientId);
                break;
            case 'reschedule-session':
                handleRescheduleSession(button);
                break;
            case 'save-draft':
                savePatientDraft();
                break;
            case 'add-therapist':
                showAddTherapistModal();
                break;
            case 'prev-week':
                navigateWeek(-1);
                break;
            case 'next-week':
                navigateWeek(1);
                break;
            case 'send-broadcast':
                showBroadcastModal();
                break;
            case 'new-announcement':
                showAnnouncementModal();
                break;
            case 'export-report':
                exportAnalyticsReport();
                break;
            case 'sync-patient-portal':
                forceSyncPortal('patient');
                break;
            case 'sync-therapist-portal':
                forceSyncPortal('therapist');
                break;
            case 'view-patient-logs':
                showPortalLogs('patient');
                break;
            case 'view-therapist-logs':
                showPortalLogs('therapist');
                break;
            case 'refresh-logs':
                refreshSyncLogs();
                break;
            case 'close-modal':
                closeModal();
                break;
            case 'confirm-assignment':
                confirmTherapistAssignment();
                break;
            default:
                console.warn('Unknown action:', action);
                showToast('Feature available in full version', 'info');
        }
    } catch (error) {
        console.error('Error handling action:', error);
        showToast('Action failed - please try again', 'error');
    }
}

// Dashboard functions
function updateDashboard() {
    console.log('Updating dashboard...');
    
    updateHeaderStats();
    populateRecentActivity();
    populateTodaySchedule();
    updateKPICards();
    
    console.log('Dashboard updated');
}

function updateHeaderStats() {
    const stats = hospitalData.hospitalStats;
    
    // Update header stats
    const activePatientsEl = document.getElementById('active-patients');
    const todayAppointmentsEl = document.getElementById('today-appointments');
    const availableTherapistsEl = document.getElementById('available-therapists');
    
    if (activePatientsEl) activePatientsEl.textContent = stats.totalPatients;
    if (todayAppointmentsEl) todayAppointmentsEl.textContent = stats.todayAppointments;
    
    // Calculate available therapists
    const availableCount = hospitalData.therapists.filter(t => t.availability === 'Available').length;
    if (availableTherapistsEl) availableTherapistsEl.textContent = availableCount;
}

function updateKPICards() {
    const stats = hospitalData.hospitalStats;
    
    // Update KPI values
    const kpiValues = document.querySelectorAll('.kpi-value');
    if (kpiValues.length >= 4) {
        kpiValues[0].textContent = stats.totalPatients;
        kpiValues[1].textContent = stats.activeTherapists;
        kpiValues[2].textContent = stats.todayAppointments;
        kpiValues[3].textContent = `${stats.roomUtilization}%`;
    }
}

function populateRecentActivity() {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    activityList.innerHTML = '';
    
    hospitalData.recentActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = `activity-item ${activity.status}`;
        
        let iconClass = 'fas fa-info-circle';
        if (activity.type === 'patient_registered') iconClass = 'fas fa-user-plus';
        if (activity.type === 'assignment_made') iconClass = 'fas fa-handshake';
        if (activity.type === 'session_completed') iconClass = 'fas fa-check-circle';
        if (activity.type === 'sync_update') iconClass = 'fas fa-sync';
        
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-message">${activity.message}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

function populateTodaySchedule() {
    const scheduleList = document.getElementById('schedule-list');
    if (!scheduleList) return;
    
    scheduleList.innerHTML = '';
    
    hospitalData.upcomingAppointments.forEach(appointment => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'schedule-item';
        
        scheduleItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-calendar-check"></i>
            </div>
            <div class="activity-content">
                <div class="activity-message">${appointment.patientName} - ${appointment.therapy}</div>
                <div class="activity-time">${appointment.time} with ${appointment.therapist} in ${appointment.room}</div>
            </div>
        `;
        
        scheduleList.appendChild(scheduleItem);
    });
}

// Patient Management functions
function populatePatientTable() {
    const tableBody = document.getElementById('patients-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    hospitalData.patients.forEach(patient => {
        const row = document.createElement('tr');
        
        const nextSessionDate = new Date(patient.nextSession);
        const formattedDate = nextSessionDate.toLocaleDateString() + ' ' + 
                            nextSessionDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>
                <div style="font-weight: var(--font-weight-semibold);">${patient.name}</div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${patient.phone}</div>
            </td>
            <td>${patient.age}</td>
            <td>${patient.prakriti}</td>
            <td>${patient.therapy}</td>
            <td>${patient.assignedTherapist}</td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${patient.progress}%"></div>
                </div>
                <div class="progress-text">${patient.progress}% complete</div>
            </td>
            <td><span class="status status--${patient.status.toLowerCase()}">${patient.status}</span></td>
            <td>${formattedDate}</td>
            <td>
                <button class="btn btn--sm btn--outline" onclick="viewPatientDetails('${patient.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn--sm btn--secondary" onclick="editPatient('${patient.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function handlePatientSearch() {
    const searchTerm = document.getElementById('patient-search').value.toLowerCase();
    const rows = document.querySelectorAll('#patients-table-body tr');
    
    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const id = row.cells[0].textContent.toLowerCase();
        
        if (name.includes(searchTerm) || id.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function handlePatientFilter() {
    const statusFilter = document.getElementById('status-filter');
    const therapyFilter = document.getElementById('therapy-filter');
    
    if (!statusFilter || !therapyFilter) return;
    
    const statusValue = statusFilter.value;
    const therapyValue = therapyFilter.value;
    const rows = document.querySelectorAll('#patients-table-body tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        if (statusValue && !row.cells[7].textContent.toLowerCase().includes(statusValue)) {
            showRow = false;
        }
        
        if (therapyValue && !row.cells[4].textContent.toLowerCase().includes(therapyValue)) {
            showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Therapist Management functions
function populateTherapistGrid() {
    const therapistGrid = document.getElementById('therapists-grid');
    if (!therapistGrid) return;
    
    therapistGrid.innerHTML = '';
    
    hospitalData.therapists.forEach(therapist => {
        const therapistCard = document.createElement('div');
        therapistCard.className = 'therapist-card';
        
        const initials = therapist.name.split(' ').map(n => n[0]).join('');
        const utilizationPercent = Math.round((therapist.currentPatients / therapist.maxCapacity) * 100);
        
        therapistCard.innerHTML = `
            <div class="therapist-header">
                <div class="therapist-avatar">${initials}</div>
                <div class="therapist-info">
                    <h4>${therapist.name}</h4>
                    <div class="therapist-specialization">${therapist.specialization}</div>
                </div>
                <span class="availability-badge ${therapist.availability.toLowerCase()}">${therapist.availability}</span>
            </div>
            
            <div class="therapist-stats">
                <div class="stat">
                    <span class="stat-value">${therapist.currentPatients}/${therapist.maxCapacity}</span>
                    <span class="stat-label">Patients</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${therapist.experience}</span>
                    <span class="stat-label">Experience</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${therapist.rating}⭐</span>
                    <span class="stat-label">Rating</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${utilizationPercent}%</span>
                    <span class="stat-label">Utilization</span>
                </div>
            </div>
            
            <div class="therapist-actions">
                <button class="btn btn--sm btn--outline" onclick="viewTherapistSchedule('${therapist.id}')">
                    <i class="fas fa-calendar"></i>
                    Schedule
                </button>
                <button class="btn btn--sm btn--secondary" onclick="editTherapist('${therapist.id}')">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
            </div>
        `;
        
        therapistGrid.appendChild(therapistCard);
    });
}

// Assignment Center functions
function setupAssignmentCenter() {
    console.log('Setting up assignment center...');
    
    populateUnassignedPatients();
    setupTherapistColumns();
    setupDragAndDrop();
}

function populateUnassignedPatients() {
    const unassignedContainer = document.getElementById('unassigned-patients');
    if (!unassignedContainer) return;
    
    // For demo, we'll show a few unassigned patients
    const unassignedPatients = [
        { id: 'PT005', name: 'Arjun Patel', therapy: 'Panchakarma Full Course', prakriti: 'Vata-Pitta' },
        { id: 'PT006', name: 'Maya Krishnan', therapy: 'Abhyanga + Swedana', prakriti: 'Kapha' }
    ];
    
    const patientList = unassignedContainer.querySelector('.patient-list');
    if (patientList) {
        patientList.innerHTML = '';
        
        unassignedPatients.forEach(patient => {
            const patientCard = document.createElement('div');
            patientCard.className = 'patient-card';
            patientCard.draggable = true;
            patientCard.setAttribute('data-patient-id', patient.id);
            
            patientCard.innerHTML = `
                <div class="patient-name">${patient.name}</div>
                <div class="patient-therapy">${patient.therapy}</div>
                <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary);">Prakriti: ${patient.prakriti}</div>
            `;
            
            patientList.appendChild(patientCard);
        });
    }
}

function setupTherapistColumns() {
    const therapistColumns = document.getElementById('therapist-columns');
    if (!therapistColumns) return;
    
    therapistColumns.innerHTML = '';
    
    hospitalData.therapists.forEach(therapist => {
        const column = document.createElement('div');
        column.className = 'therapist-column';
        column.setAttribute('data-therapist-id', therapist.id);
        
        // Get assigned patients for this therapist
        const assignedPatients = hospitalData.patients.filter(p => p.assignedTherapist === therapist.name);
        
        let patientsHTML = '';
        assignedPatients.forEach(patient => {
            patientsHTML += `
                <div class="patient-card" data-patient-id="${patient.id}">
                    <div class="patient-name">${patient.name}</div>
                    <div class="patient-therapy">${patient.therapy}</div>
                    <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary);">Progress: ${patient.progress}%</div>
                </div>
            `;
        });
        
        column.innerHTML = `
            <h4>${therapist.name}</h4>
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-12);">
                ${therapist.specialization} • ${therapist.currentPatients}/${therapist.maxCapacity} patients
            </div>
            <div class="assigned-patients">
                ${patientsHTML}
            </div>
        `;
        
        therapistColumns.appendChild(column);
    });
}

function setupDragAndDrop() {
    // Add drag event listeners to patient cards
    document.addEventListener('dragstart', function(e) {
        if (e.target.classList.contains('patient-card')) {
            draggedPatient = e.target;
            e.target.classList.add('dragging');
        }
    });
    
    document.addEventListener('dragend', function(e) {
        if (e.target.classList.contains('patient-card')) {
            e.target.classList.remove('dragging');
            draggedPatient = null;
        }
    });
    
    // Add drop event listeners to therapist columns
    document.addEventListener('dragover', function(e) {
        if (e.target.closest('.therapist-column')) {
            e.preventDefault();
        }
    });
    
    document.addEventListener('dragenter', function(e) {
        if (e.target.closest('.therapist-column')) {
            e.target.closest('.therapist-column').classList.add('drag-over');
        }
    });
    
    document.addEventListener('dragleave', function(e) {
        if (e.target.closest('.therapist-column')) {
            e.target.closest('.therapist-column').classList.remove('drag-over');
        }
    });
    
    document.addEventListener('drop', function(e) {
        if (e.target.closest('.therapist-column') && draggedPatient) {
            e.preventDefault();
            const column = e.target.closest('.therapist-column');
            column.classList.remove('drag-over');
            
            const therapistId = column.getAttribute('data-therapist-id');
            const patientId = draggedPatient.getAttribute('data-patient-id');
            
            assignPatientToTherapist(patientId, therapistId);
        }
    });
}

function assignPatientToTherapist(patientId, therapistId) {
    const therapist = hospitalData.therapists.find(t => t.id === therapistId);
    if (therapist) {
        showToast(`Patient ${patientId} assigned to ${therapist.name}`, 'success');
        
        // In a real app, this would update the backend
        // For now, just refresh the assignment center
        setTimeout(() => {
            setupAssignmentCenter();
        }, 1000);
    }
}

// Scheduling Hub functions - Fixed navigation
function generateWeeklyCalendar() {
    const calendarEl = document.getElementById('weekly-calendar');
    if (!calendarEl) return;
    
    const currentWeekEl = document.getElementById('current-week');
    if (currentWeekEl) {
        const startOfWeek = new Date(currentWeek);
        startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        const startStr = startOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        const endStr = endOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        currentWeekEl.textContent = `${startStr} - ${endStr}`;
    }
    
    // Generate calendar structure
    calendarEl.innerHTML = `
        <div class="calendar-header">
            <div>Time</div>
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
            <div>Sunday</div>
        </div>
        <div class="calendar-body" id="calendar-body">
            <!-- Calendar slots will be generated here -->
        </div>
    `;
    
    const calendarBody = document.getElementById('calendar-body');
    
    // Generate time slots from 9 AM to 6 PM
    for (let hour = 9; hour <= 18; hour++) {
        const timeSlot = `${hour}:00`;
        
        const row = document.createElement('div');
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '100px repeat(7, 1fr)';
        
        // Time label
        const timeLabel = document.createElement('div');
        timeLabel.className = 'time-slot';
        timeLabel.textContent = timeSlot;
        row.appendChild(timeLabel);
        
        // Day cells
        for (let day = 0; day < 7; day++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-cell';
            
            // Add sample appointments
            if (Math.random() > 0.7) {
                const appointment = document.createElement('div');
                appointment.className = 'appointment-block';
                appointment.textContent = 'Patient Session';
                appointment.addEventListener('click', function() {
                    showToast('Appointment details would open here', 'info');
                });
                cell.appendChild(appointment);
            }
            
            row.appendChild(cell);
        }
        
        calendarBody.appendChild(row);
    }
    
    updateRoomUtilization();
}

function updateRoomUtilization() {
    const roomsGrid = document.getElementById('rooms-grid');
    if (!roomsGrid) return;
    
    roomsGrid.innerHTML = '';
    
    const rooms = [
        { name: 'Room 1', status: 'occupied', patient: 'Raghav S.' },
        { name: 'Room 2', status: 'available' },
        { name: 'Room 3', status: 'occupied', patient: 'Priya D.' },
        { name: 'Room 4', status: 'maintenance' },
        { name: 'Room 5', status: 'available' },
        { name: 'Room 6', status: 'occupied', patient: 'Sunita G.' }
    ];
    
    rooms.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        
        let statusIcon = '✅';
        let statusText = 'Available';
        
        if (room.status === 'occupied') {
            statusIcon = '🔴';
            statusText = `Occupied - ${room.patient}`;
        } else if (room.status === 'maintenance') {
            statusIcon = '⚠️';
            statusText = 'Maintenance';
        }
        
        roomCard.innerHTML = `
            <div class="room-status ${room.status}">
                ${statusIcon}
            </div>
            <h4>${room.name}</h4>
            <p>${statusText}</p>
        `;
        
        roomsGrid.appendChild(roomCard);
    });
}

// Fixed week navigation function
function navigateWeek(direction) {
    // Create a new date object and modify it
    currentWeek = new Date(currentWeek);
    currentWeek.setDate(currentWeek.getDate() + (direction * 7));
    
    console.log('Navigating to week:', currentWeek.toISOString());
    
    // Regenerate the calendar with the new week
    generateWeeklyCalendar();
    
    const directionText = direction > 0 ? 'next' : 'previous';
    showToast(`Navigated to ${directionText} week`, 'info');
}

// Communication functions
function populateCommunicationCenter() {
    populateAnnouncements();
    populateNotifications();
}

function populateAnnouncements() {
    const announcementsList = document.getElementById('announcements-list');
    if (!announcementsList) return;
    
    const announcements = [
        {
            title: 'New Treatment Protocol Updates',
            content: 'Updated Panchakarma protocols are now available in the system.',
            author: 'Dr. Admin',
            time: '2 hours ago'
        },
        {
            title: 'Staff Training Session',
            content: 'Mandatory training on new patient portal features scheduled for tomorrow.',
            author: 'HR Department',
            time: '1 day ago'
        }
    ];
    
    announcementsList.innerHTML = '';
    
    announcements.forEach(announcement => {
        const item = document.createElement('div');
        item.className = 'announcement-item';
        
        item.innerHTML = `
            <div class="announcement-title">${announcement.title}</div>
            <div class="announcement-content">${announcement.content}</div>
            <div class="announcement-meta">By ${announcement.author} • ${announcement.time}</div>
        `;
        
        announcementsList.appendChild(item);
    });
}

function populateNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    if (!notificationsList) return;
    
    const notifications = [
        { type: 'alert', message: 'Patient PT001 session rescheduled', time: '15 min ago' },
        { type: 'update', message: 'Therapist portal sync completed', time: '30 min ago' },
        { type: 'alert', message: 'Room 4 maintenance scheduled', time: '1 hour ago' },
        { type: 'update', message: 'Daily backup completed successfully', time: '2 hours ago' }
    ];
    
    notificationsList.innerHTML = '';
    
    notifications.forEach(notification => {
        const item = document.createElement('div');
        item.className = 'notification-item';
        
        item.innerHTML = `
            <div class="notification-content">${notification.message}</div>
            <div class="notification-meta">${notification.time}</div>
        `;
        
        notificationsList.appendChild(item);
    });
}

// Analytics functions
function initializeCharts() {
    console.log('Initializing analytics charts...');
    
    setTimeout(() => {
        initializeOutcomesChart();
        initializeSatisfactionChart();
        populateMetricsSummary();
    }, 200);
}

function initializeOutcomesChart() {
    const canvas = document.getElementById('outcomesChart');
    if (!canvas) return;
    
    if (outcomesChart) {
        outcomesChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    
    outcomesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Successful', 'In Progress', 'Needs Follow-up'],
            datasets: [{
                data: [78, 18, 4],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function initializeSatisfactionChart() {
    const canvas = document.getElementById('satisfactionChart');
    if (!canvas) return;
    
    if (satisfactionChart) {
        satisfactionChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    
    satisfactionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Patient Satisfaction',
                data: [92, 94, 91, 95],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 85,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function populateMetricsSummary() {
    const metricsList = document.getElementById('metrics-list');
    if (!metricsList) return;
    
    const metrics = [
        { label: 'Average Treatment Duration', value: '18 days' },
        { label: 'Patient Satisfaction', value: '94%' },
        { label: 'Therapist Utilization', value: '78%' },
        { label: 'Revenue This Month', value: '₹4.2L' },
        { label: 'Completed Sessions', value: '156' },
        { label: 'Success Rate', value: '96%' }
    ];
    
    metricsList.innerHTML = '';
    
    metrics.forEach(metric => {
        const item = document.createElement('div');
        item.className = 'metric-item';
        
        item.innerHTML = `
            <div class="metric-label">${metric.label}</div>
            <div class="metric-value">${metric.value}</div>
        `;
        
        metricsList.appendChild(item);
    });
}

// Integration functions
function setupIntegrationMonitoring() {
    updateIntegrationStatus();
    populateSyncLogs();
}

function updateIntegrationStatus() {
    console.log('Integration status updated');
}

function populateSyncLogs() {
    const syncLogs = document.getElementById('sync-logs');
    if (!syncLogs) return;
    
    const logs = [
        { time: '14:55', message: 'Patient portal data synchronized', status: 'success' },
        { time: '14:54', message: 'Therapist schedules updated', status: 'success' },
        { time: '14:52', message: 'Appointment notifications sent', status: 'success' },
        { time: '14:50', message: 'Failed to sync patient PT007 data', status: 'error' },
        { time: '14:48', message: 'Database backup completed', status: 'success' }
    ];
    
    syncLogs.innerHTML = '';
    
    logs.forEach(log => {
        const item = document.createElement('div');
        item.className = 'log-item';
        
        item.innerHTML = `
            <div class="log-timestamp">${log.time}</div>
            <div class="log-message">${log.message}</div>
            <div class="log-status ${log.status}">${log.status.toUpperCase()}</div>
        `;
        
        syncLogs.appendChild(item);
    });
}

// Modal functions
function openAssignmentModal(patientId) {
    const modal = document.getElementById('assignment-modal');
    if (!modal) return;
    
    // Find patient details
    const patient = hospitalData.patients.find(p => p.id === patientId) || 
                   { id: patientId, name: 'New Patient', therapy: 'Panchakarma', prakriti: 'Unknown' };
    
    selectedPatientForAssignment = patient;
    
    // Update modal content
    const patientNameEl = document.getElementById('assignment-patient-name');
    const patientDetailsEl = document.getElementById('assignment-patient-details');
    
    if (patientNameEl) patientNameEl.textContent = patient.name;
    if (patientDetailsEl) patientDetailsEl.textContent = `${patient.therapy} • Prakriti: ${patient.prakriti}`;
    
    // Populate therapist options
    const therapistOptions = document.getElementById('therapist-options');
    if (therapistOptions) {
        therapistOptions.innerHTML = '';
        
        hospitalData.therapists.forEach(therapist => {
            const option = document.createElement('label');
            option.className = 'therapist-option';
            
            const isRecommended = therapist.availability === 'Available' && 
                                 therapist.currentPatients < therapist.maxCapacity;
            
            option.innerHTML = `
                <input type="radio" name="selectedTherapist" value="${therapist.id}" ${isRecommended ? 'checked' : ''}>
                <div>
                    <div style="font-weight: var(--font-weight-semibold);">${therapist.name}</div>
                    <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                        ${therapist.specialization} • ${therapist.currentPatients}/${therapist.maxCapacity} patients
                    </div>
                    <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary);">
                        ${therapist.availability} • Rating: ${therapist.rating}⭐
                    </div>
                </div>
            `;
            
            if (isRecommended) {
                option.classList.add('selected');
            }
            
            option.addEventListener('click', function() {
                document.querySelectorAll('.therapist-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
            
            therapistOptions.appendChild(option);
        });
    }
    
    modal.classList.remove('hidden');
    showToast('Assignment modal opened', 'info');
}

function confirmTherapistAssignment() {
    const selectedTherapist = document.querySelector('input[name="selectedTherapist"]:checked');
    
    if (!selectedTherapist || !selectedPatientForAssignment) {
        showToast('Please select a therapist', 'error');
        return;
    }
    
    const therapist = hospitalData.therapists.find(t => t.id === selectedTherapist.value);
    
    showToast(`${selectedPatientForAssignment.name} assigned to ${therapist.name}`, 'success');
    
    closeModal();
    
    // Update the dashboard
    setTimeout(() => {
        updateDashboard();
    }, 1000);
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
    selectedPatientForAssignment = null;
}

// Utility functions - Enhanced
function handlePatientRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const patientData = Object.fromEntries(formData);
    
    console.log('Registering patient:', patientData);
    
    showToast('Patient registered successfully!', 'success');
    
    // Reset form
    e.target.reset();
    
    // Navigate back to patient management
    setTimeout(() => {
        showView('patient-management');
    }, 2000);
}

function savePatientDraft() {
    showToast('Patient draft saved', 'info');
}

function handleEmergencyAssignment() {
    showToast('Emergency assignment protocol activated', 'warning');
    showView('assignment-center');
}

function handleEmergencyAlert() {
    if (confirm('Send emergency alert to all staff members?')) {
        showToast('Emergency alert sent to all staff', 'error');
    }
}

function handleRescheduleSession(button) {
    const patientId = button.getAttribute('data-patient');
    showToast(`Rescheduling session for patient ${patientId}`, 'info');
}

function viewPatientDetails(patientId) {
    showToast(`Viewing details for patient ${patientId}`, 'info');
}

function editPatient(patientId) {
    showToast(`Editing patient ${patientId}`, 'info');
}

function viewTherapistSchedule(therapistId) {
    showToast(`Viewing schedule for therapist ${therapistId}`, 'info');
    showView('scheduling-hub');
}

function editTherapist(therapistId) {
    showToast(`Editing therapist ${therapistId}`, 'info');
}

function showAddTherapistModal() {
    showToast('Add therapist feature available in full version', 'info');
}

function showBroadcastModal() {
    showToast('Broadcast message feature available in full version', 'info');
}

function showAnnouncementModal() {
    showToast('New announcement feature available in full version', 'info');
}

function showPortalLogs(portalType) {
    showToast(`${portalType} portal logs would open here`, 'info');
}

function forceSyncPortal(portalType) {
    showToast(`Force syncing ${portalType} portal...`, 'info');
    
    setTimeout(() => {
        showToast(`${portalType} portal sync completed`, 'success');
        refreshSyncLogs();
    }, 2000);
}

function exportAnalyticsReport() {
    showToast('Exporting analytics report...', 'info');
    
    setTimeout(() => {
        showToast('Report exported successfully', 'success');
    }, 2000);
}

function refreshSyncLogs() {
    populateSyncLogs();
    showToast('Sync logs refreshed', 'info');
}

function startSyncStatusUpdates() {
    // Simulate real-time sync status updates
    setInterval(() => {
        const syncStatus = document.getElementById('sync-status');
        if (syncStatus) {
            // Randomly update sync status (in real app, this would be actual status)
            const isOnline = Math.random() > 0.1; // 90% uptime
            const indicator = syncStatus.querySelector('.sync-indicator');
            const text = syncStatus.querySelector('span');
            
            if (indicator && text) {
                if (isOnline) {
                    indicator.classList.remove('offline');
                    indicator.classList.add('active');
                    text.textContent = 'All Systems Online';
                } else {
                    indicator.classList.remove('active');
                    indicator.classList.add('offline');
                    text.textContent = 'Sync Issues Detected';
                }
            }
        }
    }, 10000); // Update every 10 seconds
}

function toggleNotificationsPanel() {
    showToast('Notifications panel feature available in full version', 'info');
}

function handleKeyboardShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                showView('dashboard');
                break;
            case '2':
                e.preventDefault();
                showView('patient-management');
                break;
            case '3':
                e.preventDefault();
                showView('therapist-management');
                break;
            case '4':
                e.preventDefault();
                showView('assignment-center');
                break;
            case '5':
                e.preventDefault();
                showView('scheduling-hub');
                break;
        }
    }
    
    if (e.key === 'Escape') {
        closeModal();
    }
}

// Toast notifications - Enhanced
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: var(--space-12);
        min-width: 320px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    const colors = {
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)'
    };
    
    if (colors[type]) {
        toast.style.borderLeftColor = colors[type];
        toast.style.borderLeftWidth = '4px';
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Add CSS animations for toasts and other components
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: var(--space-8);
        flex: 1;
        color: var(--color-text);
    }
    
    .toast-close {
        background: transparent;
        border: none;
        color: var(--color-text-secondary);
        cursor: pointer;
        padding: var(--space-4);
        border-radius: var(--radius-sm);
        transition: color var(--duration-fast) var(--ease-standard);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
    }
    
    .toast-close:hover {
        color: var(--color-text);
        background: var(--color-secondary);
    }
    
    .calendar-controls {
        display: flex;
        align-items: center;
        gap: var(--space-16);
    }
    
    .calendar-controls h3 {
        margin: 0;
        color: var(--color-admin-primary);
        font-size: var(--font-size-xl);
    }
    
    /* Fix form inputs to ensure they work properly */
    .form-control {
        pointer-events: auto !important;
        user-select: auto !important;
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
    }
    
    .form-control:focus {
        outline: none !important;
        border-color: var(--color-admin-primary) !important;
        box-shadow: 0 0 0 3px rgba(45, 110, 62, 0.1) !important;
    }
    
    /* Ensure dropdowns work */
    select.form-control {
        cursor: pointer !important;
        pointer-events: auto !important;
    }
`;
document.head.appendChild(additionalStyles);

console.log('AyurSutra Hospital Administration Portal fully loaded - Fixed Version');