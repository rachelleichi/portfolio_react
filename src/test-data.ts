import { loadProjects, loadExperiences } from './services/dataService'

// Test script
async function test() {
  console.log('Testing dataService...')
  
  try {
    console.log('Loading projects...')
    const projects = await loadProjects()
    console.log('Projects loaded:', projects)
  } catch (err) {
    console.error('Error loading projects:', err)
  }

  try {
    console.log('Loading experiences...')
    const experiences = await loadExperiences()
    console.log('Experiences loaded:', experiences)
  } catch (err) {
    console.error('Error loading experiences:', err)
  }
}

test()
