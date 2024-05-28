const todoList = require('../todo');

describe('Todo List Test Suite', () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  test('should create a new todo', () => {
    todos.add({ title: 'Test todo', dueDate: '2024-05-27', completed: false });
    expect(todos.all.length).toBe(1);
    expect(todos.all[0].title).toBe('Test todo');
  });

  test('should mark a todo as completed', () => {
    todos.add({ title: 'Test todo', dueDate: '2024-05-27', completed: false });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test('should retrieve overdue items', () => {
    const today = formattedDate(new Date());
    const yesterday = formattedDate(new Date(new Date().setDate(new Date().getDate() - 1)));

    todos.add({ title: 'Overdue todo', dueDate: yesterday, completed: false });
    todos.add({ title: 'Due today todo', dueDate: today, completed: false });

    const overdueItems = todos.overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe('Overdue todo');
  });

  test('should retrieve due today items', () => {
    const today = formattedDate(new Date());

    todos.add({ title: 'Due today todo', dueDate: today, completed: false });

    const dueTodayItems = todos.dueToday();
    expect(dueTodayItems.length).toBe(1);
    expect(dueTodayItems[0].title).toBe('Due today todo');
  });

  test('should retrieve due later items', () => {
    const tomorrow = formattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

    todos.add({ title: 'Due later todo', dueDate: tomorrow, completed: false });

    const dueLaterItems = todos.dueLater();
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe('Due later todo');
  });
});

const formattedDate = (d) => {
  return d.toISOString().split('T')[0];
};
