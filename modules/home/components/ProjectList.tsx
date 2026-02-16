"use client";
import { useGetProjects, useDeleteProject, useUpdateProject } from "@/modules/projects/hooks/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FolderKanban, Calendar, ArrowRight, MoreVertical, Pencil, Trash2, Check, X, FlaskConical } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProjectList = () => {
    const { data: projects, isPending } = useGetProjects();

    const formatDate = (data: string | number | Date) => {
        return new Date(data).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };
    if (isPending) {
        return (
            <div className="w-full mt-16 px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-linear-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">Your Past Cooks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-36 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (!projects || !Array.isArray(projects) || projects.length === 0) {
        return (
            <div className="w-full mt-16 px-4">
                <div className="flex flex-col items-center justify-center gap-4 py-16 max-w-md mx-auto text-center">
                    <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <FolderKanban className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">No projects yet</h3>
                    <p className="text-sm text-muted-foreground">
                        Describe your idea above and let the AI cook your first project.
                    </p>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm transition-colors"
                    >
                        <FlaskConical className="w-4 h-4" />
                        Create your first project
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mt-16 px-4">
            <div className="flex items-center justify-center gap-3 mb-8">
                <FlaskConical className="w-7 h-7 text-emerald-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-center bg-linear-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">Your Cooks</h2>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:grid grid-cols-3 gap-4 max-w-6xl mx-auto">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} formatDate={formatDate} />
                ))}
            </div>

            {/* Mobile View (Carousel) */}
            <div className="lg:hidden max-w-4xl mx-auto px-4">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {projects.map((project) => (
                            <CarouselItem key={project.id} className="pl-4 md:basis-1/2">
                                <ProjectCard project={project} formatDate={formatDate} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="border-emerald-500/30 bg-background/80 hover:bg-emerald-500/20 hover:border-emerald-500 text-foreground" />
                    <CarouselNext className="border-emerald-500/30 bg-background/80 hover:bg-emerald-500/20 hover:border-emerald-500 text-foreground" />
                </Carousel>
            </div>
        </div>
    );
};

const ProjectCard = ({ project, formatDate }: { project: any, formatDate: any }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(project.name);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { mutateAsync: deleteProject, isPending: isDeleting } = useDeleteProject();
    const { mutateAsync: updateProject, isPending: isUpdating } = useUpdateProject();

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await deleteProject(project.id);
            toast.success("Project deleted successfully");
            setShowDeleteConfirm(false);
        } catch (error) {
            toast.error("Failed to delete project");
        }
    };

    const handleRename = async (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (newName.trim() === "" || newName === project.name) {
            setIsEditing(false);
            setNewName(project.name);
            return;
        }
        try {
            await updateProject({ projectId: project.id, name: newName.trim() });
            toast.success("Project renamed successfully");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to rename project");
            setNewName(project.name);
        }
    };

    const handleCancelEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(false);
        setNewName(project.name);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleRename(e);
        } else if (e.key === "Escape") {
            setIsEditing(false);
            setNewName(project.name);
        }
    };

    if (showDeleteConfirm) {
        return (
            <Card className="h-full border-destructive/50 bg-destructive/5 dark:bg-destructive/10 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-3">
                    <div className="flex flex-col gap-3">
                        <p className="text-sm text-muted-foreground">Delete &quot;{project.name}&quot;?</p>
                        <p className="text-xs text-destructive">This action cannot be undone.</p>
                        <div className="flex gap-2">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1"
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(false); }}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="group h-full hover:shadow-xl transition-all duration-300 border-border/50 dark:border-zinc-800/50 hover:border-emerald-500/50 cursor-pointer bg-card/80 dark:bg-zinc-900/30 backdrop-blur-sm overflow-hidden relative">
            <Link href={`/projects/${project.id}`} className="block h-full">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-2.5 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
                            <FolderKanban className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="flex items-center gap-1">
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                    <DropdownMenuItem
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditing(true); }}
                                        className="gap-2 cursor-pointer"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        Rename
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowDeleteConfirm(true); }}
                                        className="gap-2 text-destructive focus:text-destructive cursor-pointer"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    {isEditing ? (
                        <div className="flex items-center gap-1" onClick={(e) => e.preventDefault()}>
                            <Input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="h-8 text-sm"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10"
                                onClick={handleRename}
                                disabled={isUpdating}
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                onClick={handleCancelEdit}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <CardTitle className="text-lg text-foreground group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {project.name}
                        </CardTitle>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 mr-2" />
                        <span>{formatDate(project.createdAt)}</span>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};

export default ProjectList;