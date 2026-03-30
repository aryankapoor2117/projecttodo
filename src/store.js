import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function getSupabase() {
  return supabase;
}

export async function getProject(code) {
  const { data } = await supabase
    .from('projects')
    .select('*, tasks(*)')
    .eq('code', code)
    .order('created_at', { referencedTable: 'tasks', ascending: false })
    .single();
  return data;
}

export async function createProject(name) {
  const code = name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).slice(2, 6);
  const { data } = await supabase
    .from('projects')
    .insert({ code, name: name.trim() })
    .select('*, tasks(*)')
    .single();
  return data;
}

export async function joinProject(code) {
  return getProject(code.trim().toLowerCase());
}

export async function addTask(projectCode, memberName, description) {
  const { data } = await supabase
    .from('tasks')
    .insert({ project_code: projectCode, member_name: memberName.trim(), description: description.trim() })
    .select()
    .single();
  return data;
}

export async function updateTaskStatus(projectCode, taskId, status) {
  await supabase.from('tasks').update({ status }).eq('id', taskId);
  return getProject(projectCode);
}

export async function deleteTask(projectCode, taskId) {
  await supabase.from('tasks').delete().eq('id', taskId);
  return getProject(projectCode);
}
