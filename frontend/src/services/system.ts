export async function getSystemSummary() {
  return Promise.resolve({
    organizations: 5,
    reportingStrategies: 3,
    pushStrategies: 4,
    fixedGroups: 6,
  })
}
