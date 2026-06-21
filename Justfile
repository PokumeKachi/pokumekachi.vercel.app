_default:
    @just --choose

run:
    npm run dev

todo:
    taskwarrior-tui --taskdata .task
