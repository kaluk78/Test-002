import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Plus,
  Clock,
  CheckSquare,
  AlertCircle,
  Timer,
  Wrench
} from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { repositories, activities, stats, analyticsData, tasks, recommendations } from '../data/mockData';
import HealthTrendChart from '../components/HealthTrendChart';
import ActivityTimeline from '../components/ActivityTimeline';
import RecommendationCard from '../components/RecommendationCard';
import TaskItem from '../components/TaskItem';
import PageHeader from '../components/ui/PageHeader';
import DashboardViewTabs from '../components/ui/DashboardViewTabs';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import TasksGrid from '../components/tasks/TasksGrid';
import StatCard from '../components/StatCard';
import useThemeStore from '../stores/themeStore';

// Sample historical data for sparklines
const repositoriesHistory = [5, 6, 8, 9, 10, 12];
const healthHistory = [75, 76, 78, 80, 79, 81];
const issuesHistory = [15, 18, 21, 25, 22, 24];
const deploymentsHistory = [50, 58, 65, 72, 79, 86];

// Enhanced Dashboard with new features
const Dashboard = () => {
  const { darkMode } = useThemeStore();
  const [activeView, setActiveView] = useState('tasks'); // 'repos', 'tasks'
  const [showAllStats, setShowAllStats] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const visibleRecommendations = recommendations.slice(0, 3);
  const visibleTasks = tasks.filter(task => task.status === 'running' || task.status === 'paused').slice(0, 2);
  const scheduledTasks = tasks.filter(task => task.status === 'scheduled').slice(0, 2);

  const dashboardViews = [
    { id: 'tasks', label: 'Tasks' },
    { id: 'repos', label: 'Repositories' }
  ];

  return (
    <div className="p-6 relative z-10">
      <div className="max-w-[1620px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          {/* Dashboard View Switcher */}
          <DashboardViewTabs
            activeView={activeView}
            setActiveView={setActiveView}
            views={dashboardViews}
            darkMode={darkMode}
          />
        </div>

        {/* Mobile View Selector */}
        <div className="flex sm:hidden mb-4">
          <div className="relative">
            <select
              value={activeView}
              onChange={(e) => setActiveView(e.target.value)}
              className={`w-full appearance-none py-2 px-3 rounded-md 
                ${darkMode
                  ? 'bg-gray-800 border-gray-700 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-700'
                } border`}
            >
              <option value="tasks">Tasks</option>
              <option value="repos">Repositories</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Repositories"
            value={stats[0].value}
            change={stats[0].change}
            trend={stats[0].trend}
            chart={repositoriesHistory}
            type="repositories"
            darkMode={darkMode}
          />
          <StatCard
            title="Average Health"
            value={stats[1].value}
            change={stats[1].change}
            trend={stats[1].trend}
            chart={healthHistory}
            type="health"
            darkMode={darkMode}
          />
          <StatCard
            title="Open Issues"
            value={stats[2].value}
            change={stats[2].change}
            trend={stats[2].trend}
            chart={issuesHistory}
            type="issues"
            darkMode={darkMode}
          />
          <StatCard
            title="Deployments"
            value={stats[3].value}
            change={stats[3].change}
            trend={stats[3].trend}
            chart={deploymentsHistory}
            type="deployments"
            darkMode={darkMode}
          />
        </div>

        {/* Tasks View */}
        {activeView === 'tasks' && (
          <>
            <TasksOverview darkMode={darkMode} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card variant={darkMode ? 'default' : 'elevated'} darkMode={darkMode}>
                  <CardHeader darkMode={darkMode}>
                    <CardTitle darkMode={darkMode}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                          Needs Attention
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          darkMode={darkMode}
                          as={Link}
                          to="/tasks"
                          className="flex items-center"
                        >
                          View All Tasks
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TasksGrid
                      tasks={tasks.filter(task => task.status === 'paused' || task.status === 'running')}
                      limit={3}
                      darkMode={darkMode}
                      emptyMessage="No tasks need attention"
                    />
                  </CardContent>
                </Card>

                <Card variant={darkMode ? 'default' : 'elevated'} darkMode={darkMode} className="mt-6">
                  <CardHeader darkMode={darkMode}>
                    <CardTitle darkMode={darkMode}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-purple-500" />
                          Upcoming Tasks
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TasksGrid
                      tasks={tasks.filter(task => task.status === 'scheduled')}
                      type="scheduled"
                      limit={3}
                      darkMode={darkMode}
                      emptyMessage="No scheduled tasks"
                    />

                    <div className="mt-4 text-center">
                      <Button
                        variant="gradient-primary"
                        icon={<CheckSquare className="h-4 w-4" />}
                        darkMode={darkMode}
                        as={Link}
                        to="/tasks"
                      >
                        View All Tasks
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <TaskMetricsCard darkMode={darkMode} />

                <RecentToolExecutionsCard darkMode={darkMode} />

                <Card variant={darkMode ? 'gradient' : 'glass'} darkMode={darkMode}>
                  <CardHeader darkMode={darkMode}>
                    <CardTitle darkMode={darkMode}>Recently Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tasks.filter(task => task.status === 'completed').slice(0, 3).map(task => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          darkMode={darkMode}
                          compact={true}
                        />
                      ))}

                      {tasks.filter(task => task.status === 'completed').length === 0 && (
                        <div className={`text-center py-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          No completed tasks
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter darkMode={darkMode}>
                    <Button
                      variant="link"
                      className="w-full"
                      darkMode={darkMode}
                      as={Link}
                      to="/tasks/completed"
                    >
                      View Task History
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Repository View */}
        {activeView === 'repos' && (
          <>
            {/* Health Trend Chart */}
            <Card variant={darkMode ? 'gradient' : 'glass'} darkMode={darkMode} className="mb-6">
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Health Trend
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <select
                        className={`text-xs py-1 appearance-none px-2 rounded-md ${darkMode ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-white text-gray-700 border-gray-300'
                          } border`}
                      >
                        <option>Last 10 Weeks</option>
                        <option>Last 3 Months</option>
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} aria-hidden="true" />
                      </div>
                    </div>
                    <Button variant="link" size="sm" darkMode={darkMode}>
                      Details
                    </Button>
                  </div>
                </div>
                <div className="mt-1">
                  <HealthTrendChart
                    data={analyticsData.detailedHealthTrend}
                    darkMode={darkMode}
                    height={250}
                    showBrush={false}
                    showReferenceLine={true}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Repository Grid */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Repository Health
                  </h2>
                  <Link
                    to="/repositories"
                    className={`text-sm ${darkMode
                      ? 'text-primary-400 hover:text-primary-300'
                      : 'text-primary-600 hover:text-primary-800'} font-medium transition flex items-center`}
                  >
                    View All
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {repositories.slice(0, 4).map(repo => (
                    <RepositoryCard
                      key={repo.id}
                      repository={repo}
                      darkMode={darkMode}
                    />
                  ))}
                </div>

                <div className="mt-6">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Recommendations
                  </h2>
                  <div className="space-y-4">
                    {visibleRecommendations.map(recommendation => (
                      <RecommendationCard
                        key={recommendation.id}
                        type={recommendation.type}
                        title={recommendation.title}
                        description={recommendation.description}
                        actions={recommendation.actions}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity & Tasks Sidebar */}
              <div className="space-y-6">
                {/* Activity Timeline */}
                <Card variant={darkMode ? 'gradient' : 'default'} darkMode={darkMode}>
                  <ActivityTimeline
                    activities={activities}
                    darkMode={darkMode}
                    maxItems={5}
                    showFilters={true}
                  />
                  <CardFooter darkMode={darkMode}>
                    <Link
                      to="/profile"
                      className={`text-sm w-full ${darkMode
                        ? 'text-primary-400 hover:text-primary-300'
                        : 'text-primary-600 hover:text-primary-800'} font-medium transition flex items-center justify-center`}
                    >
                      View All Activity
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </CardFooter>
                </Card>

                {/* Running Tasks */}
                <Card variant={darkMode ? 'gradient' : 'glass'} darkMode={darkMode}>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Running Tasks
                      </h2>
                      <Link
                        to="/tasks"
                        className={`text-sm ${darkMode
                          ? 'text-primary-400 hover:text-primary-300'
                          : 'text-primary-600 hover:text-primary-800'} font-medium flex items-center`}
                      >
                        View All
                        <ExternalLink className="ml-1 w-3 h-3" />
                      </Link>
                    </div>

                    {visibleTasks.map(task => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        darkMode={darkMode}
                        compact={true}
                      />
                    ))}

                    {visibleTasks.length === 0 && (
                      <div className={`text-center py-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No running tasks
                      </div>
                    )}

                    <div className="mt-2">
                      <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Scheduled
                      </h3>

                      {scheduledTasks.map(task => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          darkMode={darkMode}
                          compact={true}
                        />
                      ))}

                      {scheduledTasks.length === 0 && (
                        <div className={`text-center py-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                          No scheduled tasks
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <Button
                        variant="gradient-primary"
                        className="w-full"
                        icon={<Plus className="w-4 h-4" />}
                        darkMode={darkMode}
                      >
                        Create New Task
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Task Status Card component
const TaskStatusCard = ({ status, count, color, darkMode = false }) => {
  const getBgColor = () => {
    switch (color) {
      case 'blue': return darkMode ? 'bg-blue-900/30 border-blue-800/50' : 'bg-blue-50 border-blue-100';
      case 'green': return darkMode ? 'bg-green-900/30 border-green-800/50' : 'bg-green-50 border-green-100';
      case 'amber': return darkMode ? 'bg-amber-900/30 border-amber-800/50' : 'bg-amber-50 border-amber-100';
      case 'red': return darkMode ? 'bg-red-900/30 border-red-800/50' : 'bg-red-50 border-red-100';
      default: return darkMode ? 'bg-gray-800/30 border-gray-700/50' : 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`${getBgColor()} p-3 rounded-lg border text-center`}>
      <div className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{count}</div>
      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{status}</div>
    </div>
  );
};

const TaskMetricsCard = ({ darkMode = false }) => {
  // Calculate some fake metrics for demonstration
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);
  const avgDuration = '14.5 min';

  return (
    <Card variant={darkMode ? 'gradient' : 'glass'} darkMode={darkMode} className="mb-6">
      <CardHeader darkMode={darkMode}>
        <CardTitle darkMode={darkMode}>
          <div className="flex items-center">
            <Timer className="mr-2 h-5 w-5" />
            Task Performance
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tasks This Month
              </div>
              <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                24/50
              </div>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
              <div className="bg-gradient-brand h-2.5 rounded-full" style={{ width: '48%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Completion Rate
              </div>
              <div className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {completionRate}%
              </div>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${completionRate}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Avg. Completion Time
              </div>
              <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {avgDuration}
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Success Rate
              </div>
              <div className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                95%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Recent Tool Executions Card
const RecentToolExecutionsCard = ({ darkMode = false }) => {
  const recentExecutions = [
    {
      id: '1',
      tool: 'Documentation Generator',
      repository: 'Frontend App',
      executedAt: 'Today, 9:15 AM',
      status: 'success'
    },
    {
      id: '2',
      tool: 'Security Scanner',
      repository: 'Backend API',
      executedAt: 'Yesterday, 3:45 PM',
      status: 'error'
    },
    {
      id: '3',
      tool: 'Code Deduplication',
      repository: 'Utils Library',
      executedAt: 'May 10, 2025',
      status: 'success'
    }
  ];

  return (
    <Card variant={darkMode ? 'gradient' : 'default'} darkMode={darkMode} className="mb-6">
      <CardHeader darkMode={darkMode}>
        <CardTitle darkMode={darkMode}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wrench className="mr-2 h-5 w-5" />
              Recent Tool Executions
            </div>
            <Button
              variant="link"
              size="sm"
              darkMode={darkMode}
              as={Link}
              to="/tools"
              className="flex items-center"
            >
              All Tools
              <ExternalLink className="ml-1 w-3 h-3" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentExecutions.map(execution => (
            <div key={execution.id} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}>
              <div>
                <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {execution.tool}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {execution.repository} • {execution.executedAt}
                </div>
              </div>

              <Badge
                variant={execution.status === 'success' ? 'success' : 'danger'}
                darkMode={darkMode}
              >
                {execution.status === 'success' ? 'Success' : 'Failed'}
              </Badge>
            </div>
          ))}
        </div>

        <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Button
            variant="gradient-primary"
            className="w-full"
            icon={<Wrench className="w-4 h-4" />}
            darkMode={darkMode}
            as={Link}
            to="/tools"
          >
            Run Tool
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Task overview component for the dashboard
const TasksOverview = ({ darkMode = false }) => {
  const runningTasks = tasks.filter(task => task.status === 'running').length;
  const pausedTasks = tasks.filter(task => task.status === 'paused').length;
  const scheduledTasks = tasks.filter(task => task.status === 'scheduled').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  return (
    <Card variant={darkMode ? 'gradient' : 'default'} darkMode={darkMode} className="mb-6">
      <CardHeader darkMode={darkMode}>
        <CardTitle darkMode={darkMode}>
          <div className="flex items-center">
            <CheckSquare className="mr-2 h-5 w-5" />
            Tasks Overview
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <TaskStatusCard status="Running" count={runningTasks} color="blue" darkMode={darkMode} />
          <TaskStatusCard status="Paused" count={pausedTasks} color="amber" darkMode={darkMode} />
          <TaskStatusCard status="Scheduled" count={scheduledTasks} color="green" darkMode={darkMode} />
          <TaskStatusCard status="Completed" count={completedTasks} color="gray" darkMode={darkMode} />
        </div>

        <div className="space-y-4">
          {/* Recent tasks section */}
          <div>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Recent Tasks</h3>

            {tasks.slice(0, 3).map(task => (
              <div key={task.id} className={`flex items-center justify-between p-3 mb-2 rounded-lg ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'
                } transition-colors`}>
                <div>
                  <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {task.title}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {task.repository} • {task.status === 'scheduled' ?
                      `Scheduled for ${task.scheduledFor}` :
                      task.status === 'completed' ?
                        `Completed ${task.completedAt}` :
                        `Started ${task.createdAt}`}
                  </div>
                </div>

                <Badge
                  variant={
                    task.status === 'running' ? 'progress' :
                      task.status === 'paused' ? 'warning' :
                        task.status === 'completed' ? 'success' : 'default'
                  }
                  darkMode={darkMode}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>

          <div className={`flex justify-between items-center pt-4 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {tasks.length} Total Tasks
            </div>
            <Button
              variant="gradient-primary"
              size="sm"
              icon={<Plus className="h-4 w-4" />}
              darkMode={darkMode}
              as={Link}
              to="/tasks"
            >
              New Task
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Repository Card for dashboard
const RepositoryCard = ({ repository, darkMode = false }) => {
  // Determine health status for indicator
  let healthClass = '';
  let badgeVariant: 'success' | 'warning' | 'danger' = 'success';

  if (repository.healthScore >= 80) {
    healthClass = 'health-high';
    badgeVariant = 'success';
  } else if (repository.healthScore >= 60) {
    healthClass = 'health-medium';
    badgeVariant = 'warning';
  } else {
    healthClass = 'health-low';
    badgeVariant = 'danger';
  }

  return (
    <Card
      variant={darkMode ? 'gradient' : 'default'}
      darkMode={darkMode}
      className="transition-transform hover:translate-y-[-2px]"
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div className={`status-indicator ${healthClass} font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {repository.name}
          </div>
          <Badge variant={badgeVariant} darkMode={darkMode}>
            {repository.healthScore}%
          </Badge>
        </div>

        {repository.description && (
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
            {repository.description.substring(0, 60) + (repository.description.length > 60 ? '...' : '')}
          </p>
        )}

        <div className="flex items-center text-xs space-x-2 mb-4">
          <span className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mr-1.5"></span>
            {repository.language}
          </span>
          <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Updated {repository.lastActivity}</span>
        </div>

        <Link
          to={`/repository/${repository.id}`}
          className={`inline-flex items-center text-sm ${darkMode
            ? 'text-primary-400 hover:text-primary-300'
            : 'text-primary-600 hover:text-primary-800'} transition`}
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default Dashboard;