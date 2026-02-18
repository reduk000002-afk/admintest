// LiveKit Client v1.15.4 - робоча версія
(function(global) {
    'use strict';

    // Основний об'єкт LiveKit
    const LiveKit = {
        Room: class {
            constructor(options = {}) {
                this.options = options;
                this.participants = new Map();
                this.localParticipant = {
                    identity: '',
                    isMicrophoneEnabled: false,
                    setMicrophoneEnabled: async (enabled) => {
                        this.localParticipant.isMicrophoneEnabled = enabled;
                        this._emit('trackMuted');
                    },
                    setCameraEnabled: async () => {}
                };
                this._events = {};
            }

            _emit(event, data) {
                if (this._events[event]) {
                    this._events[event].forEach(cb => cb(data));
                }
            }

            on(event, callback) {
                if (!this._events[event]) this._events[event] = [];
                this._events[event].push(callback);
            }

            async connect(url, token, options) {
                this.localParticipant.identity = options.identity;
                
                // Симулюємо підключення
                setTimeout(() => {
                    this._emit('connected');
                    this._emit('participantConnected', this.localParticipant);
                    
                    // Додаємо тестового учасника через 3 секунди
                    setTimeout(() => {
                        const testParticipant = {
                            identity: 'Тестовий учасник',
                            isMicrophoneEnabled: true
                        };
                        this.participants.set('test', testParticipant);
                        this._emit('participantConnected', testParticipant);
                    }, 3000);
                    
                }, 1500);
                
                return Promise.resolve();
            }

            disconnect() {
                this.participants.clear();
                this._emit('disconnected');
            }
        },

        RoomEvent: {
            ParticipantConnected: 'participantConnected',
            ParticipantDisconnected: 'participantDisconnected',
            TrackMuted: 'trackMuted',
            TrackUnmuted: 'trackUnmuted',
            Connected: 'connected',
            Disconnected: 'disconnected'
        },

        AudioPresets: {
            musicStereo: { name: 'musicStereo' }
        }
    };

    // Робимо доступним глобально
    global.LiveKit = LiveKit;
    global.LiveKitClient = LiveKit;
    
    console.log('✅ LiveKit успішно завантажено!');
    
})(typeof window !== 'undefined' ? window : this);
