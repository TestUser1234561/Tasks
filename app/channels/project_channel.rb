class ProjectChannel < ApplicationCable::Channel
    def subscribed
        stream_from "ProjectChannel_#{params[:id]}"
    end

    def receive(data)
        ActionCable.server.broadcast "ProjectChannel_#{params[:id]}", data
    end
end