const { Domain, Course, CourseBatch, sequelize,Axis,TaskGroup ,Task,User,Role,RoleAssignment,Team,TeamMember,TaskAssignment} = require('../academix-backend/models');

async function insertData() {
  // await sequelize.sync({ force: true });
  await sequelize.sync({ force: true });


  // === Domains ===
  const domains = [];
  const domainData = [
    { name: 'תחום פיתוח', description: 'עולם התוכנה של הבסיס' },
    { name: 'תחום שמע', description: 'תחום של השמעות בבסיס צניפים' }
  ];

  for (const dom of domainData) {
    const [domain] = await Domain.findOrCreate({
      where: { name: dom.name },
      defaults: dom
    });
    domains.push(domain);
  }

  // === Courses ===
  const courses = [];
  const courseData = [
    {
      name: 'full-stack',
      domainId: domains[0].id,
      symbol: 'ID101',
      duration_months: 4
    },
    {
      name: '17 שמע',
      domainId: domains[1].id,
      symbol: 'CA201',
      duration_months: 3
    }
  ];

  for (const course of courseData) {
    const [c] = await Course.findOrCreate({
      where: { name: course.name },
      defaults: course
    });
    courses.push(c);
  }

  // === CourseBatches ===
  const courseBatchData = [
    {
      courseId: courses[0].id,
      name: 'בסמח 1',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-06-01')
    },
    {
      courseId: courses[1].id,
      name: 'מחזור כ"ב',
      start_date: new Date('2024-02-01'),
      end_date: new Date('2024-05-01')
    }
  ];


  for (const cb of courseBatchData) {
    await CourseBatch.findOrCreate({
      where: { name: cb.name },
      defaults: cb
    });
  }

  const axisData = [
    { courseId: courses[0].id, name: 'צד לקוח' },
    { courseId: courses[0].id, name: 'צד שרת' },
    { courseId: courses[1].id, name: 'אלחוט' },
    { courseId: courses[1].id, name: 'התנהלות' },
  ];
  
  const axes = [];
  for (const data of axisData) {
    const [axis, created] = await Axis.findOrCreate({
      where: { courseId: data.courseId, name: data.name },
      defaults: data
    });
    axes.push(axis);
  }

  const taskGroupData = [
    { axisId: axes[0].id, name: 'ריאקט' },
    { axisId: axes[0].id, name: 'אנגולר' },
    { axisId: axes[1].id, name: 'שרתים באקספרס' },
    { axisId: axes[2].id, name: 'חיבורי אוזניות' },
    { axisId: axes[3].id, name: 'ניהול זמן' },
  ];
  
  const taskGroups = [];
  for (const data of taskGroupData) {
    const [taskGroup, created] = await TaskGroup.findOrCreate({
      where: { axisId: data.axisId, name: data.name },
      defaults: data
    });
    taskGroups.push(taskGroup);
  }


  for (const group of taskGroups) {
    const taskName = `משימה עבור ${group.name}`;
  
    const [task, created] = await Task.findOrCreate({
      where: {
        taskGroupId: group.id,
        name: taskName,
      },
      defaults: {
        description: `זה משימה פשוטה עבור ${group.name}`,
        repository_kind: 'operational',
        estimatedMinutes: 30,
        stage: 'intro',
        checklistRequired: false,
        requiresSubmission: false,
        linkUrl: `https://example.com/tasks/${group.id}`,
      }
    });
  
    if (created) {
      console.log(`✅ Created task: ${task.name}`);
    } else {
      console.log(`ℹ️ Task already exists for group: ${group.name}`);
    }
  }


  const userCount = await User.count();
if (userCount === 0) {
  await User.bulkCreate([
    { name: 'שניאור שרייבר', email: 'shneor@example.com' },
    { name: 'נתן ברנס', email: 'natan@example.com' },
    { name: 'בנימין רמתי', email: 'binyamin@example.com' },
    { name: 'יפעת', email: 'yfat@example.com' },
    { name: 'אליס דיין', email: 'alis@example.com' }
  ]);
}
  
const rolesData = [
  { code: 'ADMIN', name_he: 'אדמין', name_en: 'admin' },
  { code: 'DOMAIN_MANAGER', name_he: 'מנהל תחום', name_en: 'domain manager' },
  { code: 'COURSE_COMMANDER', name_he: 'מפקד קורס', name_en: 'course commander' },
  { code: 'TEAM_COMMANDER', name_he: 'מפקד צוות', name_en: 'team commander' },
  { code: 'STUDENT', name_he: 'חניך', name_en: 'Student' },
];

for (const role of rolesData) {
  const [r, created] = await Role.findOrCreate({
    where: { code: role.code },
    defaults: role
  });

  if (created) {
    console.log(`✅ Created role: ${role.code}`);
  } else {
    console.log(`ℹ️ Role already exists: ${role.code}`);
  }
}


const teams = [
  { name: 'צוות פיתוח צניפים', course_batch_id: 1 },
  { name: 'צוות עיצוב ', course_batch_id: 1 },
  { name: 'צוות גפן', course_batch_id: 2 },
  { name: 'צוות אלחוט-מרום', course_batch_id: 2 }
];

for (const team of teams) {
  await Team.findOrCreate({
    where: {
      name: team.name,
      course_batch_id: team.course_batch_id
    }
  });
}


const teamMembers = [
  // Alpha Team (id: 1)
  { team_id: 1, user_id: 1, member_role: 'instructor' },
  { team_id: 1, user_id: 2, member_role: 'student' },

  // Beta Team (id: 2)
  { team_id: 2, user_id: 3, member_role: 'instructor' },

  // Gamma Team (id: 3)
  { team_id: 3, user_id: 4, member_role: 'student' },
  { team_id: 3, user_id: 1, member_role: 'assistant' },

  // Delta Team (id: 4)
  { team_id: 4, user_id: 2, member_role: 'viewer' },
];

for (const member of teamMembers) {
  await TeamMember.findOrCreate({
    where: {
      team_id: member.team_id,
      user_id: member.user_id
    },
    defaults: {
      member_role: member.member_role
    }
  });
}



const roleAssignmentsData = [
  {
    userEmail: 'shneor@example.com',
    roleCode: 'ADMIN',
    scopeType: 'system',
    scopeName: 'global'
  },
  {
    userEmail: 'natan@example.com',
    roleCode: 'DOMAIN_MANAGER',
    scopeType: 'domain',
    scopeName: 'תחום פיתוח'
  },
  {
    userEmail: 'binyamin@example.com',
    roleCode: 'COURSE_COMMANDER',
    scopeType: 'course',
    scopeName: '17 שמע'
  },
  {
    userEmail: 'yfat@example.com',
    roleCode: 'TEAM_COMMANDER',
    scopeType: 'team',
    scopeName: 'צוות גפן'
  },
  {
    userEmail: 'alis@example.com',
    roleCode: 'STUDENT',
    scopeType: 'team',
    scopeName: 'צוות אלחוט-מרום'
  }
];

const getScopeModel = (type) => {
  switch (type) {
    case 'domain':
      return Domain;
    case 'course':
      return Course;
    case 'team':
      return Team;
    case 'TeamMember':
      return User;
    case 'system':
      return null; // אין ישות קונקרטית
    default:
      return null;
  }
};

for (const item of roleAssignmentsData) {
  const user = await User.findOne({ where: { email: item.userEmail } });
  const role = await Role.findOne({ where: { code: item.roleCode } });

  let scopeId = null;

  if (item.scopeType !== 'system' ) {
    
    const ScopeModel = getScopeModel(item.scopeType);
    if (!ScopeModel) {
      console.warn(`❌ Unknown scopeType: ${item.scopeType}`);
      continue;
    }

 
     const  scopeRecord = await ScopeModel.findOne({ where: { name: item.scopeName } });

    if (!scopeRecord) {
      console.warn(`🔴 Missing scope for ${item.userEmail} (scopeType: ${item.scopeType}, name: ${item.scopeName})`);
      continue;
    }

    scopeId = scopeRecord.id;
  }

  if (!user || !role) {
    console.warn(`🔴 Missing user or role for ${item.userEmail}`);
    continue;
  }

  await RoleAssignment.findOrCreate({
    where: {
      user_id: user.id,
      role_code: role.code,
      scope_type: item.scopeType,
      scope_id: scopeId
    },
    defaults: {
      user_id: user.id,
      role_code: role.code,
      scope_type: item.scopeType,
      scope_id: scopeId
    }
  });
}

 



const taskAssignments = [
  {
    task_id: 1,
    user_id: 1,
    status: 'assigned',
    assigned_at: new Date('2025-07-01T08:00:00Z'),
    submitted_at: null
  },
  {
    task_id: 2,
    user_id: 2,
    status: 'assigned',
    assigned_at: new Date('2025-07-02T09:00:00Z'),
    submitted_at: null
  },
  {
    task_id: 3,
    user_id: 3,
    status: 'completed',
    assigned_at: new Date('2025-07-03T10:00:00Z'),
    submitted_at: new Date('2025-07-10T17:00:00Z')
  },
  {
    task_id: 4,
    user_id: 4,
    status: 'completed',
    assigned_at: new Date('2025-07-04T11:00:00Z'),
    submitted_at: new Date('2025-07-11T17:00:00Z')
  }
];


for (const ta of taskAssignments) {
  const isCompleted = ta.status === 'completed';

  const [record, created] = await TaskAssignment.findOrCreate({
    where: {
      task_id: ta.task_id,
      user_id: ta.user_id
    },
    defaults: {
      status: ta.status,
      assigned_at: ta.assigned_at,
      completed_at: isCompleted ? ta.submitted_at : null
    }
  });

  if (!created) {
    await record.update({
      status: ta.status,
      assigned_at: ta.assigned_at,
      submitted_at: ta.submitted_at,
      completed_at: isCompleted ? ta.submitted_at : null
    });
  }
}



  

}

module.exports = insertData;
