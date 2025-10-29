// Demo users for testing - this runs once to populate localStorage
export const initializeDemoUsers = () => {
  const existingUsers = localStorage.getItem('yazoo_users')
  
  if (!existingUsers) {
    const demoUsers = [
      {
        id: '1',
        name: 'Demo User',
        email: 'demo@yazoo.com',
        password: 'demo123',
        createdAt: new Date().toISOString()
      }
    ]
    
    localStorage.setItem('yazoo_users', JSON.stringify(demoUsers))
    console.log('Demo users initialized')
  }
}

// Call this when the app loads
initializeDemoUsers()