import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { jsPlumb } from 'jsplumb';


@Component({
    templateUrl: './final-eight.component.html',
    styleUrls: ['./final-eight.component.less']
})
export class FinalEightComponent implements AfterViewInit, OnDestroy {

    private jsPlumbInstance;

    ngAfterViewInit() {
        this.jsPlumbInstance = jsPlumb.getInstance();
        this.drawConnections();
    }

    ngOnDestroy() {
        this.jsPlumbInstance.reset();
    }
    

    drawConnections() {
        let labelName = 'connection';
        this.jsPlumbInstance.connect({
            connector: ['Flowchart', { stub: [100, 67], cornerRadius: 1, alwaysRespectStubs: true }],
            source: 'Source-1',
            target: 'Target-1',
            anchor: ['Right', 'Left'],
            paintStyle: { stroke: '#456', strokeWidth: 4 },
            // overlays: [
            //   ['Label', { label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel' }]
            // ],
        });

        this.jsPlumbInstance.connect({
            connector: ['Flowchart', { stub: [100, 67], cornerRadius: 1, alwaysRespectStubs: true }],
            source: 'Source-2',
            target: 'Target-2',
            anchor: ['Right', 'Left'],
            paintStyle: { stroke: '#456', strokeWidth: 4 },
            // overlays: [
            //   ['Label', { label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel' }]
            // ],
            });

        this.jsPlumbInstance.connect({
            connector: ['Flowchart', { stub: [100, 67], cornerRadius: 1, alwaysRespectStubs: true }],
            source: 'Source-3',
            target: 'Target-3',
            anchor: ['Right', 'Left'],
            endpoint:[ 'Dot', { cssClass: 'z-index-2' }],
            paintStyle: { stroke: '#456', strokeWidth: 4},
            // overlays: [
            //   ['Label', { label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel' }]
            // ],
            });

        this.jsPlumbInstance.connect({
            connector: ['Flowchart', { stub: [100, 67], cornerRadius: 1, alwaysRespectStubs: true }],
            source: 'Source-4',
            target: 'Target-4',
            anchor: ['Left', 'Right'],
            paintStyle: { stroke: '#456', strokeWidth: 4 },
            // overlays: [
            //   ['Label', { label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel' }]
            // ],
        });
        
        this.jsPlumbInstance.connect({
            connector: ['Flowchart', { stub: [100, 67], cornerRadius: 1, alwaysRespectStubs: true }],
            source: 'Source-5',
            target: 'Target-5',
            anchor: ['Left', 'Right'],
            paintStyle: { stroke: '#456', strokeWidth: 4 },
            // overlays: [
            //   ['Label', { label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel' }]
            // ],
            });
        
        this.jsPlumbInstance.connect({
            connector: ['Flowchart', { stub: [100, 67], cornerRadius: 1, alwaysRespectStubs: true }],
            source: 'Source-6',
            target: 'Target-6',
            anchor: ['Left', 'Right'],
            endpoint:[ 'Dot', { cssClass: 'z-index-2' }],
            paintStyle: { stroke: '#456', strokeWidth: 4 },
            // overlays: [
            //   ['Label', { label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel' }]
            // ],
            });

        this.jsPlumbInstance.connect({
            connector: ['Flowchart', { stub: [100, 67], cornerRadius: 1, alwaysRespectStubs: true }],
            source: 'Source-7',
            target: 'Target-7',
            anchor: ['Left', 'Right'],
            endpoint:[ 'Dot', { cssClass: 'z-index-2' }],
            paintStyle: { stroke: '#456', strokeWidth: 4 },
            // overlays: [
            //   ['Label', { label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel' }]
            // ],
            });
    }

}