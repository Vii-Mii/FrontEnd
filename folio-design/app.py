# Import necessary modules
from flask import Flask, render_template

app = Flask(__name__)

def get_skill_icon(skill_name):
    """Return Font Awesome icon class for each skill"""
    icons = {
        'Python': 'fab fa-python',
        'JavaScript': 'fab fa-js',
        'SQL': 'fas fa-database',
        'Django': 'fab fa-python',
        'Flask': 'fab fa-python',
        'FastAPI': 'fas fa-bolt',
        'PostgreSQL': 'fas fa-database',
        'MongoDB': 'fas fa-database',
        'Redis': 'fas fa-database',
        'Docker': 'fab fa-docker',
        'AWS': 'fab fa-aws',
        'Git': 'fab fa-git',
    }
    return icons.get(skill_name, 'fas fa-code')

# Add the function to the template context
app.jinja_env.globals.update(get_skill_icon=get_skill_icon)

portfolio_data = {
    'name': 'Vijayaraj.',
    'role': 'Backend Developer',
    'tagline': 'Building robust and scalable backend solutions',
    'about': {
        'description': 'I am a passionate Python Backend Developer with 5+ years of experience building scalable web applications and RESTful APIs. Specialized in distributed systems and cloud architecture.',
        'highlights': [
            'Developed high-performance APIs serving 1M+ daily requests',
            'Reduced system response time by 40% through optimization',
            'Led team of 5 developers in microservices architecture implementation',
            'Contributed to multiple open-source Python projects'
        ],
        'experience_years': 5,
        'projects_completed': 30,
        'happy_clients': 15
    },
    'contact': {
        'email': 'john.doe@example.com',
        'phone': '+1 (555) 123-4567',
        'location': 'San Francisco, CA',
        'social': {
            'github': 'https://github.com/johndoe',
            'linkedin': 'https://linkedin.com/in/johndoe',
            'twitter': 'https://twitter.com/johndoe'
        }
    },
    'skills': {
        'Languages': [
            {'name': 'Python', 'level': 90},
            {'name': 'JavaScript', 'level': 75},
            {'name': 'SQL', 'level': 85}
        ],
        'Frameworks': [
            {'name': 'Django', 'level': 85},
            {'name': 'Flask', 'level': 90},
            {'name': 'FastAPI', 'level': 80}
        ],
        'Databases': [
            {'name': 'PostgreSQL', 'level': 85},
            {'name': 'MongoDB', 'level': 80},
            {'name': 'Redis', 'level': 75}
        ],
        'Tools': [
            {'name': 'Docker', 'level': 85},
            {'name': 'AWS', 'level': 80},
            {'name': 'Git', 'level': 90}
        ]
    },
    'projects': [
        {
            'id': 'ecommerce-api',
            'name': 'E-commerce API',
            'short_description': 'RESTful API for e-commerce platform with 100k+ daily users',
            'description': '''A robust e-commerce API built with Django REST Framework, handling everything from product management to order processing. This scalable solution serves over 100,000 daily requests with an average response time under 100ms.''',
            'tech_stack': ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
            'github': 'https://github.com/johndoe/ecommerce-api',
            'live_demo': 'https://api.ecommerce-demo.com',
            'key_features': [
                'JWT authentication with refresh tokens',
                'Real-time inventory management',
                'Payment gateway integration',
                'Comprehensive API documentation',
                'Automated order processing',
                'Redis caching for performance'
            ],
            'metrics': {
                'Daily Requests': '100k+',
                'Response Time': '<100ms',
                'Uptime': '99.9%',
                'API Endpoints': '50+'
            }
        },
        {
            'id': 'task-manager',
            'name': 'Task Manager',
            'short_description': 'Real-time task management system with WebSocket support',
            'description': '''A modern task management solution built with FastAPI and MongoDB, enabling real-time collaboration for teams. Features include real-time updates, team management, and progress tracking.''',
            'tech_stack': ['Python', 'FastAPI', 'MongoDB', 'Docker', 'WebSocket'],
            'github': 'https://github.com/johndoe/task-manager',
            'live_demo': 'https://taskmanager-demo.com',
            'key_features': [
                'Real-time updates via WebSocket',
                'Team collaboration tools',
                'Progress tracking dashboard',
                'File attachments support',
                'Email notifications',
                'Role-based access control'
            ],
            'metrics': {
                'Active Users': '10k+',
                'Tasks Managed': '1M+',
                'Team Workspaces': '500+',
                'Avg Response': '<50ms'
            }
        },
        {
            'id': 'analytics-dashboard',
            'name': 'Analytics Dashboard',
            'short_description': 'Real-time analytics dashboard processing 1M+ events daily',
            'description': '''A comprehensive analytics dashboard that processes and visualizes millions of events daily. Built with Flask and PostgreSQL, it provides real-time insights through interactive charts and customizable widgets.''',
            'tech_stack': ['Python', 'Flask', 'PostgreSQL', 'Redis', 'Vue.js'],
            'github': 'https://github.com/johndoe/analytics',
            'live_demo': 'https://analytics-demo.com',
            'key_features': [
                'Real-time data visualization',
                'Custom alert system',
                'Automated reporting',
                'Interactive dashboards',
                'Data export functionality',
                'Role-based access control'
            ],
            'metrics': {
                'Daily Events': '1M+',
                'Active Dashboards': '1k+',
                'Data Points': '100M+',
                'Report Generation': '<3s'
            }
        }
    ]
}

@app.route('/')
def home():
    return render_template('index.html', data=portfolio_data)

@app.route('/project/<project_id>')
def project_detail(project_id):
    project = next((p for p in portfolio_data['projects'] if p['id'] == project_id), None)
    if project:
        return render_template('project.html', project=project, data=portfolio_data)
    return "Project not found", 404

if __name__ == '__main__':
    app.run(debug=True)


