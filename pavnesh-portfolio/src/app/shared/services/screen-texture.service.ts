import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class ScreenTextureService {

    constructor() { }

    createTerminalTexture(): THREE.CanvasTexture {

        const canvas = document.createElement('canvas');

        canvas.width = 1600;
        canvas.height = 1000;

        const ctx = canvas.getContext('2d')!;

        // =====================================================
        // Background
        // =====================================================

        ctx.fillStyle = '#0d1117';
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // =====================================================
        // Header
        // =====================================================

        this.drawWindowHeader(
            ctx,
            canvas.width,
            'Windows Terminal - PowerShell'
        );

        // =====================================================
        // Terminal Font
        // =====================================================

        ctx.font = '34px Consolas';

        let y = 110;

        const lines = [

            {
                color: '#58a6ff',
                text: 'PS E:\\Portfolio\\Developer-Workspace>'
            },

            {
                color: '#e6edf3',
                text: 'git status'
            },

            {
                color: '#7ee787',
                text: 'On branch main'
            },

            {
                color: '#7ee787',
                text: "Your branch is up to date with 'origin/main'."
            },

            {
                color: '#e6edf3',
                text: ''
            },

            {
                color: '#7ee787',
                text: 'nothing to commit, working tree clean'
            },

            {
                color: '#e6edf3',
                text: ''
            },

            {
                color: '#58a6ff',
                text: 'PS E:\\Portfolio\\Developer-Workspace>'
            },

            {
                color: '#e6edf3',
                text: 'git push origin main'
            },

            {
                color: '#f2cc60',
                text: ''
            },

            {
                color: '#f2cc60',
                text: 'Enumerating objects: 18, done.'
            },

            {
                color: '#f2cc60',
                text: 'Counting objects: 100% (18/18), done.'
            },

            {
                color: '#f2cc60',
                text: 'Delta compression using up to 8 threads'
            },

            {
                color: '#f2cc60',
                text: 'Compressing objects: 100% (11/11), done.'
            },

            {
                color: '#f2cc60',
                text: 'Writing objects: 100% (18/18), 5.73 KiB'
            },

            {
                color: '#7ee787',
                text: 'To github.com:Pavnesh-Silori/Developer-Workspace.git'
            },

            {
                color: '#7ee787',
                text: '4e2ac71..f5c1e8d  main -> main'
            },

            {
                color: '#e6edf3',
                text: ''
            },

            {
                color: '#58a6ff',
                text: 'PS E:\\Portfolio\\Developer-Workspace>'
            }

        ];

        lines.forEach(line => {

            ctx.fillStyle = line.color;

            ctx.fillText(
                line.text,
                35,
                y
            );

            y += 42;

        });

        // =====================================================
        // Cursor
        // =====================================================

        this.drawCursor(
            ctx,
            620,
            y - 24
        );

        // =====================================================
        // Scroll Bar
        // =====================================================

        this.drawScrollbar(
            ctx,
            canvas.width,
            canvas.height
        );

        return this.createTexture(canvas);

    }

    createVSCodeTexture(): THREE.CanvasTexture {

        const canvas = document.createElement('canvas');

        canvas.width = 1600;
        canvas.height = 1000;

        const ctx = canvas.getContext('2d')!;

        // =====================================================
        // Background
        // =====================================================

        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // Header

        this.drawWindowHeader(
            ctx,
            canvas.width,
            'Visual Studio Code'
        );

        // =====================================================
        // Activity Bar
        // =====================================================

        ctx.fillStyle = '#333333';

        ctx.fillRect(
            0,
            58,
            55,
            canvas.height - 58
        );

        // =====================================================
        // Explorer
        // =====================================================

        ctx.fillStyle = '#252526';

        ctx.fillRect(
            55,
            58,
            320,
            canvas.height - 58
        );

        ctx.fillStyle = '#d4d4d4';

        ctx.font = '34px Segoe UI';

        ctx.fillText(
            'EXPLORER',
            80,
            100
        );

        const files = [

            '📁 Portfolio',

            '  📁 src',

            '    📁 app',

            '      📄 scene.service.ts',

            '      📄 desk.service.ts',

            '      📄 laptop.service.ts',

            '      📄 monitor.service.ts',

            '      📄 screen-texture.service.ts',

            '      📄 app.component.ts'

        ];

        let fy = 150;

        files.forEach(file => {

            ctx.fillStyle = '#cccccc';

            ctx.fillText(
                file,
                80,
                fy
            );

            fy += 45;

        });

        // =====================================================
        // Editor Area
        // =====================================================

        ctx.fillStyle = '#1e1e1e';

        ctx.fillRect(
            375,
            58,
            canvas.width - 375,
            canvas.height - 58
        );

        ctx.font = '34px Consolas';

        let y = 120;

        const code = [

            'export class LaptopService {',

            '',

            '  createLaptop(desk: THREE.Group) {',

            '',

            '      this.createStand();',

            '      this.createBase();',

            '      this.createDisplay();',

            '',

            '      return laptop;',

            '  }',

            '',

            '}'

        ];

        code.forEach(line => {

            if (line.includes('class')) {

                ctx.fillStyle = '#4ec9b0';

            }

            else if (line.includes('create')) {

                ctx.fillStyle = '#dcdcaa';

            }

            else {

                ctx.fillStyle = '#d4d4d4';

            }

            ctx.fillText(
                line,
                420,
                y
            );

            y += 42;

        });

        this.drawStatusBar(
            ctx,
            canvas.width,
            canvas.height
        );

        return this.createTexture(canvas);

    }

    createSpringBootTexture(): THREE.CanvasTexture {

        // =====================================================
        // Canvas
        // =====================================================

        const canvas = document.createElement('canvas');

        // Landscape canvas matching the horizontal monitor
        canvas.width = 1600;
        canvas.height = 950;

        const ctx = canvas.getContext('2d')!;


        // =====================================================
        // IntelliJ Light Theme Background
        // =====================================================

        ctx.fillStyle = '#ffffff';

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // =====================================================
        // Top Window Bar
        // =====================================================

        ctx.fillStyle = '#f2f2f2';

        ctx.fillRect(
            0,
            0,
            canvas.width,
            48
        );


        // IntelliJ title

        ctx.fillStyle = '#444444';

        ctx.font = '34px Segoe UI';

        ctx.fillText(
            'IntelliJ IDEA',
            25,
            31
        );


        // =====================================================
        // Toolbar
        // =====================================================

        ctx.fillStyle = '#eeeeee';

        ctx.fillRect(
            0,
            48,
            canvas.width,
            48
        );


        ctx.font = '34px Segoe UI';

        ctx.fillStyle = '#444444';

        const toolbarItems = [
            'File',
            'Edit',
            'View',
            'Navigate',
            'Code',
            'Run',
            'Tools',
            'Help'
        ];

        toolbarItems.forEach((item, index) => {

            ctx.fillText(
                item,
                25 + index * 85,
                79
            );

        });


        // =====================================================
        // Project Panel
        // =====================================================

        const projectWidth = 300;

        ctx.fillStyle = '#f7f7f7';

        ctx.fillRect(
            0,
            96,
            projectWidth,
            canvas.height - 96
        );


        // Project title

        ctx.fillStyle = '#333333';

        ctx.font = '18px Segoe UI';

        ctx.fillText(
            'Project',
            22,
            130
        );


        // =====================================================
        // Project Files
        // =====================================================

        ctx.font = '34px Segoe UI';

        const files = [

            'portfolio-backend',

            '  src',

            '    main',

            '      java',

            '        controller',

            '          ProjectController.java',

            '        service',

            '          ProjectService.java',

            '        repository',

            '          ProjectRepository.java',

            '        model',

            '          Project.java',

            '      resources',

            '        application.yml',

            '  pom.xml'

        ];


        let projectY = 170;


        files.forEach((file, index) => {

            // Folder color
            if (
                file.includes('src') ||
                file.includes('main') ||
                file.includes('java') ||
                file.includes('controller') ||
                file.includes('service') ||
                file.includes('repository') ||
                file.includes('model') ||
                file.includes('resources')
            ) {

                ctx.fillStyle = '#555555';

            }

            // Java files
            else if (
                file.includes('.java') ||
                file.includes('pom')
            ) {

                ctx.fillStyle = '#1565c0';

            }

            else {

                ctx.fillStyle = '#333333';

            }


            ctx.fillText(
                file,
                20,
                projectY
            );


            projectY += 26;

        });


        // =====================================================
        // Editor Area
        // =====================================================

        ctx.fillStyle = '#ffffff';

        ctx.fillRect(
            projectWidth,
            96,
            canvas.width - projectWidth,
            canvas.height - 96
        );


        // =====================================================
        // File Tab
        // =====================================================

        ctx.fillStyle = '#fafafa';

        ctx.fillRect(
            projectWidth,
            96,
            canvas.width - projectWidth,
            45
        );


        ctx.fillStyle = '#333333';

        ctx.font = '17px Segoe UI';

        ctx.fillText(
            'ProjectController.java',
            projectWidth + 25,
            125
        );


        // =====================================================
        // Java Code
        // =====================================================

        ctx.font = '34px Consolas';

        const codeStartX = projectWidth + 35;

        let codeY = 180;


        const code = [

            'package com.pavnesh.portfolio.controller;',

            '',

            'import org.springframework.web.bind.annotation.*;',

            'import java.util.List;',

            '',

            '@RestController',

            '@RequestMapping("/api/projects")',

            'public class ProjectController {',

            '',

            '    private final ProjectService projectService;',

            '',

            '    public ProjectController(ProjectService projectService) {',

            '        this.projectService = projectService;',

            '    }',

            '',

            '    @GetMapping',

            '    public List<Project> getProjects() {',

            '',

            '        return projectService.findAll();',

            '    }',

            '',

            '}'

        ];


        // =====================================================
        // Syntax Highlighting
        // =====================================================

        code.forEach(line => {


            // Package
            if (
                line.startsWith('package')
            ) {

                ctx.fillStyle = '#7b1fa2';

            }

            // Import
            else if (
                line.startsWith('import')
            ) {

                ctx.fillStyle = '#1976d2';

            }

            // Spring annotations
            else if (
                line.startsWith('@')
            ) {

                ctx.fillStyle = '#c62828';

            }

            // Class
            else if (
                line.includes('class')
            ) {

                ctx.fillStyle = '#00897b';

            }

            // Return
            else if (
                line.includes('return')
            ) {

                ctx.fillStyle = '#1565c0';

            }

            // Method
            else if (
                line.includes('public')
            ) {

                ctx.fillStyle = '#6a1b9a';

            }

            // Normal text
            else {

                ctx.fillStyle = '#222222';

            }


            ctx.fillText(
                line,
                codeStartX,
                codeY
            );


            codeY += 31;

        });


        // =====================================================
        // Bottom Status Bar
        // =====================================================

        ctx.fillStyle = '#f2f2f2';

        ctx.fillRect(
            0,
            canvas.height - 32,
            canvas.width,
            32
        );


        ctx.fillStyle = '#555555';

        ctx.font = '34px Segoe UI';

        ctx.fillText(
            'Spring Boot 3.5   |   Java 21   |   Maven   |   Running',
            20,
            canvas.height - 10
        );


        // =====================================================
        // Texture
        // =====================================================

        const texture = new THREE.CanvasTexture(canvas);

        texture.colorSpace = THREE.SRGBColorSpace;

        texture.needsUpdate = true;

        return texture;
    }

    createLaptopTerminalTexture(): THREE.CanvasTexture {

        const canvas = document.createElement('canvas');

        canvas.width = 1200;
        canvas.height = 800;

        const ctx = canvas.getContext('2d')!;

        // =====================================================
        // Terminal Background
        // =====================================================

        ctx.fillStyle = '#0d1117';

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // =====================================================
        // Terminal Header
        // =====================================================

        ctx.fillStyle = '#161b22';

        ctx.fillRect(
            0,
            0,
            canvas.width,
            55
        );


        // Traffic buttons

        const buttons = [
            '#ff5f56',
            '#ffbd2e',
            '#27c93f'
        ];

        buttons.forEach((color, index) => {

            ctx.beginPath();

            ctx.fillStyle = color;

            ctx.arc(
                25 + index * 25,
                28,
                7,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });


        // Terminal title

        ctx.fillStyle = '#c9d1d9';

        ctx.font = '20px Segoe UI';

        ctx.fillText(
            'PowerShell',
            110,
            35
        );


        // =====================================================
        // Terminal Text
        // =====================================================

        ctx.font = '24px Consolas';

        let y = 100;

        const lines = [

            {
                text: 'PS E:\\Portfolio\\pavnesh-portfolio>',
                color: '#58a6ff'
            },

            {
                text: 'git status',
                color: '#e6edf3'
            },

            {
                text: '',
                color: '#e6edf3'
            },

            {
                text: 'On branch main',
                color: '#e6edf3'
            },

            {
                text: 'Your branch is up to date with origin/main.',
                color: '#7ee787'
            },

            {
                text: '',
                color: '#e6edf3'
            },

            {
                text: 'nothing to commit, working tree clean',
                color: '#7ee787'
            },

            {
                text: '',
                color: '#e6edf3'
            },

            {
                text: 'PS E:\\Portfolio\\pavnesh-portfolio>',
                color: '#58a6ff'
            },

            {
                text: 'git push origin main',
                color: '#e6edf3'
            },

            {
                text: '',
                color: '#e6edf3'
            },

            {
                text: 'Enumerating objects: 18, done.',
                color: '#f2cc60'
            },

            {
                text: 'Counting objects: 100% (18/18), done.',
                color: '#f2cc60'
            },

            {
                text: 'Writing objects: 100% (18/18), done.',
                color: '#f2cc60'
            },

            {
                text: '',
                color: '#e6edf3'
            },

            {
                text: 'To github.com:Pavnesh-Silori/pavnesh-portfolio.git',
                color: '#7ee787'
            },

            {
                text: 'main -> main',
                color: '#7ee787'
            },

            {
                text: '',
                color: '#e6edf3'
            },

            {
                text: 'PS E:\\Portfolio\\pavnesh-portfolio>',
                color: '#58a6ff'
            }

        ];


        lines.forEach(line => {

            ctx.fillStyle = line.color;

            ctx.fillText(
                line.text,
                30,
                y
            );

            y += 34;

        });


        // =====================================================
        // Cursor
        // =====================================================

        ctx.fillStyle = '#ffffff';

        ctx.fillRect(
            390,
            y - 27,
            12,
            25
        );


        // =====================================================
        // Texture
        // =====================================================

        const texture = new THREE.CanvasTexture(canvas);

        texture.colorSpace = THREE.SRGBColorSpace;

        texture.needsUpdate = true;

        return texture;
    }


    private drawCursor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    ): void {

        ctx.fillStyle = '#ffffff';

        ctx.fillRect(
            x,
            y,
            14,
            28
        );

    }

    private createTexture(
        canvas: HTMLCanvasElement
    ): THREE.CanvasTexture {

        const texture =
            new THREE.CanvasTexture(canvas);

        texture.colorSpace =
            THREE.SRGBColorSpace;

        texture.needsUpdate = true;

        texture.flipY = false;

        texture.generateMipmaps = true;

        texture.minFilter =
            THREE.LinearMipmapLinearFilter;

        texture.magFilter =
            THREE.LinearFilter;

        return texture;

    }

    private drawWindowHeader(
        ctx: CanvasRenderingContext2D,
        width: number,
        title: string
    ): void {

        ctx.fillStyle = '#20252c';

        ctx.fillRect(
            0,
            0,
            width,
            58
        );

        const colors = [
            '#ff5f56',
            '#ffbd2e',
            '#27c93f'
        ];

        colors.forEach((color, index) => {

            ctx.beginPath();

            ctx.fillStyle = color;

            ctx.arc(
                28 + index * 24,
                29,
                7,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });

        ctx.fillStyle = '#d0d7de';

        ctx.font = '34px Segoe UI';

        ctx.fillText(
            title,
            120,
            37
        );

    }

    private drawScrollbar(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ): void {

        ctx.fillStyle = '#2d333b';

        ctx.fillRect(
            width - 12,
            58,
            6,
            height - 58
        );

        ctx.fillStyle = '#7d8590';

        ctx.fillRect(
            width - 12,
            210,
            6,
            180
        );

    }

    private drawStatusBar(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ): void {

        ctx.fillStyle = '#007acc';

        ctx.fillRect(
            0,
            height - 28,
            width,
            28
        );

        ctx.font = '34px Segoe UI';

        ctx.fillStyle = '#ffffff';

        ctx.fillText(
            'TypeScript    UTF-8    Ln 78, Col 18',
            20,
            height - 8
        );

    }

}