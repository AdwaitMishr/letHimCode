import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createProject, getProjectById, getProjects, deleteProject, updateProject } from "../actions"

export const useGetProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: () => getProjects()
    });
}

export const useCreateProjects = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (value: string) => createProject(value),
        onSuccess: () => queryClient.invalidateQueries( {queryKey: ["projects"]}),
    })
}

export const useGetProjectById = (projectId: string) => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: () => getProjectById(projectId),
    })
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (projectId: string) => deleteProject(projectId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    })
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ projectId, name }: { projectId: string; name: string }) =>
            updateProject(projectId, name),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    })
}