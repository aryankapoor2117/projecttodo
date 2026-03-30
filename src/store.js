import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function getProject(code) {
  const { data, error } = await supabase
    .from('projects')
    .select('*, tasks(*)')
    .eq('code', code)
    .single();
  if (error) console.error('getProject error:', error);
  return data;
}

export async function createProject(name) {
  const code = name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).slice(2, 6);
  const { error } = await supabase
    .from('projects')
    .insert({ code, name: name.trim() });
  if (error) { console.error('createProject error:', error); return null; }
  return getProject(code);
}

export async function joinProject(code) {
  return getProject(code.trim().toLowerCase());
}

export async function addTask(projectCode, memberName, description) {
  const { data, error } = await supabase
    .from('tasks')
    .insert({ project_code: projectCode, member_name: memberName.trim(), description: description.trim() })
    .select()
    .single();
  if (error) console.error('addTask error:', error);
  return data;
}

export async function updateTaskStatus(projectCode, taskId, status) {
  const { error } = await supabase.from('tasks').update({ status }).eq('id', taskId);
  if (error) console.error('updateTaskStatus error:', error);
  return getProject(projectCode);
}

export async function deleteTask(projectCode, taskId) {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) console.error('deleteTask error:', error);
  return getProject(projectCode);
}
